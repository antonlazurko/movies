import { useState, useEffect, lazy, Suspense, useContext } from "react";
import { Route, useParams, useLocation, useHistory } from "react-router-dom";
import { NavLink, useRouteMatch } from "react-router-dom";
import * as moviesAPI from "../services/movie-api";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { FirebaseContext } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";

import Status from "../services/Status";
import s from "../views/MovieDetailsPage.module.css";
import { TParams, LocationState } from "../types";
import { Button, Container } from "@material-ui/core";

const initialState = {
  id: "string",
  name: "string",
  title: "string",
  poster_path: "string",
  release_date: "string",
  overview: "string",
};

const NotFoundView = lazy(
  () => import("../views/NotFoundView" /*webpackChunkName: "NotFoundView" */)
);
const Cast = lazy(() => import("./Cast" /*webpackChunkName: "Cast" */));
const Reviews = lazy(
  () => import("./Reviews" /*webpackChunkName: "Reviews" */)
);

export default function MovieDetailsPage() {
  const { firestore, auth } = useContext(FirebaseContext);
  const [movie, setMovie] = useState<typeof initialState>(initialState);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);

  const { movieId } = useParams<TParams>();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation<LocationState>();
  const handleGoBack = () => {
    location?.state?.from
      ? history.push(location.state.from)
      : history.push((location.state.from = "/movies"));
  };
  const handleAddToFavorite = () => {
    firestore
      ?.collection(`${user?.displayName}`)
      .doc(`movieId${movieId}`)
      .set({ movieId })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  useEffect(() => {
    setStatus(Status.PENDING);
    moviesAPI
      .fetchMovieDetails(movieId)
      .then((movie) => {
        setMovie(movie);
        setStatus(Status.RESOLVED);
      })
      .catch((Error) => {
        setError(Error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);
  return (
    <>
      {status === Status.PENDING && <p>Download movie</p>}
      {status === Status.REJECTED && <NotFoundView error={error} />}
      {status === Status.RESOLVED && (
        <Container fixed>
          <div className={s.buttonsArea}>
            <Button aria-label="delete" onClick={handleGoBack}>
              <ArrowBackIosIcon fontSize="small" />
              Back
            </Button>
            <Button aria-label="delete" onClick={handleAddToFavorite}>
              <AddToPhotosIcon fontSize="small" />
              Add to favorites
            </Button>
          </div>
          <h2>{movie.title}</h2>
          <div className={s.movieCard}>
            <div className={s.poster}>
              {movie.poster_path && (
                <img
                  className={s.image}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
            </div>
            <div className={s.descr}>
              <div className={s.reliese}>
                Release date: {movie.release_date}
              </div>
              <div className={s.text}>{movie.overview}</div>
            </div>
          </div>
          <div>
            <NavLink
              to={{
                pathname: `${url}/Cast`,
                state: { from: location },
              }}
              className={s.Cast}
            >
              Cast of "{movie.title}" movie
            </NavLink>
            <NavLink
              to={{
                pathname: `${url}/Reviews`,
                state: { from: location },
              }}
              className={s.Reviews}
            >
              Reviews of "{movie.title}" movie
            </NavLink>
            <hr />
            <Suspense fallback={<div>Downloading...</div>}>
              <Route path={`${path}/Cast`}>
                <Cast movieId={movieId} />
              </Route>
              <Route path={`${path}/Reviews`}>
                <Reviews movieId={movieId} />
              </Route>
            </Suspense>
          </div>
        </Container>
      )}
    </>
  );
}
