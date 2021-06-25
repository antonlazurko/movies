import React, { useState, useEffect, useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useLocation, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import DeleteIcon from "@material-ui/icons/Delete";

import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core";

import { FirebaseContext } from "../../index";

import { TMovies } from "../../types";
import * as moviesAPI from "../../services/movie-api";
import s from "../HomeView.module.css";
import styles from "./FavoriteMovieView.module.css";

const FavoriteMovieView: React.FC = () => {
  const { firestore, auth } = useContext(FirebaseContext);
  const [movies, setMovies] = useState<TMovies[]>([]);
  const location = useLocation();
  const [user] = useAuthState(auth);
  const [favoriteMovies, loading, error] = useCollectionData(
    firestore?.collection(`${user?.displayName}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const handleRemoveFavorite = (id: string) => {
    firestore
      ?.collection(`${user?.displayName}`)
      .doc(`movieId${id}`)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  const movieRender = (favoriteMovieEl: any, moviesArr: TMovies[] | []) => {
    const movie = moviesArr.find(
      (movie) => `${movie.id}` === favoriteMovieEl.movieId
    );

    return (
      <ListItem key={favoriteMovieEl.movieId}>
        <Link
          to={{
            pathname: `/movies/${movie?.id}`,
            state: { from: location },
          }}
          className={s.name}
        >
          {movie?.name ?? movie?.title}
        </Link>
        <ListItemSecondaryAction>
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveFavorite(favoriteMovieEl.movieId)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  useEffect(() => {
    moviesAPI
      .fetchPopularMovies()
      .then(({ results }) => {
        setMovies(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className={s.title}>Favorites</h1>
      {favoriteMovies?.length ? (
        <List>
          {loading && <div>Loading</div>}
          {error && <div>{error}</div>}
          {!loading &&
            favoriteMovies?.map((favoriteMovie) =>
              movieRender(favoriteMovie, movies)
            )}
        </List>
      ) : (
        <h2 className={`${styles.title}`}>No one movie</h2>
      )}
    </>
  );
};
export default FavoriteMovieView;
