import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { List, Button, ListItem } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useLocation, useHistory } from "react-router-dom";

import * as moviesAPI from "../services/movie-api";
import Searchbar from "../Components/Searchbar/Searchbar";
import Status from "../services/Status";
import s from "../views/MoviesView.module.css";

type TSearchQuery = string;
type TMovie = {
  id: string;
  name: string;
  title: string;
  poster_path: string;
  release_date: string;
};

export default function MoviesView() {
  const history = useHistory();
  const location = useLocation();

  const [movieQuery, setMovieQuery] = useState(
    new URLSearchParams(location.search).get("query") ?? ""
  );
  const [queryPage, setQueryPage] = useState(1);
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState("");

  const onSearchbarSubmit = (data: TSearchQuery) => {
    history.push({ ...location, search: `query=${data}` });
    setMovieQuery(data);
  };

  useEffect(() => {
    setQueryPage(1);
    setMovies([]);
  }, [movieQuery]);

  const onLoadMoreBtn = () => setQueryPage((prevState) => prevState + 1);

  useEffect(() => {
    if (movieQuery === "") {
      return;
    }
    setStatus(Status.PENDING);
    moviesAPI
      .fetchMoviesByQuery(movieQuery, queryPage)
      .then(({ results }) => {
        setMovies((prevState) => [...prevState, ...results]);
        setStatus(Status.RESOLVED);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieQuery, queryPage]);

  return (
    <>
      <Searchbar onSearchbarSubmit={onSearchbarSubmit} />
      <ToastContainer autoClose={3000} position="top-center" />

      {status === Status.PENDING && <p>Download movie collection</p>}
      {status === Status.REJECTED && <p>{error}</p>}
      {status === Status.RESOLVED && (
        <>
          <List>
            {movies.length < 1 && (
              <div className={s.listNotification}>
                No results for your request.
              </div>
            )}
            {movies.map((movie) => (
              <ListItem key={movie.id} className={s.item}>
                <Link
                  className={s.title}
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { from: location },
                  }}
                >
                  {movie.title}
                </Link>
              </ListItem>
            ))}
          </List>
          {movies.length > 0 && (
            <Button onClick={onLoadMoreBtn} variant="outlined">
              Load more
              <GetAppIcon fontSize="small" />
            </Button>
          )}
        </>
      )}
    </>
  );
}
