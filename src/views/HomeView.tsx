import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import * as moviesAPI from "../services/movie-api";
import Status from "../services/Status";
import s from "../views/HomeView.module.css";
import { TMovies } from "../types";

export default function HomeView() {
  const [movies, setMovies] = useState<TMovies[]>([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    setStatus(Status.PENDING);
    moviesAPI
      .fetchPopularMovies()
      .then(({ results }) => {
        if (!results.length) {
          setStatus(Status.REJECTED);
          setMovies(movies);
        } else {
          setMovies(results);
          setStatus(Status.RESOLVED);
        }
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {status === Status.PENDING && <p>Download trending collection</p>}
      {status === Status.REJECTED && <p>{error}</p>}
      {status === Status.RESOLVED && (
        <>
          <h1 className={s.title}>Trending this week</h1>
          <ul className={s.list}>
            {movies &&
              movies.map((movie) => (
                <li key={movie.id} className={s.item}>
                  <Link
                    to={{
                      pathname: `/movies/${movie.id}`,
                      state: { from: location },
                    }}
                    className={s.name}
                  >
                    {movie.name ?? movie.title}
                  </Link>
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  );
}
