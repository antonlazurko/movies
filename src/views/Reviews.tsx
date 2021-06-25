import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as moviesAPI from '../services/movie-api';
import Status from '../services/Status';
import s from '../views/Reviews.module.css';
type TMovieId = { movieId: string }
interface IRewiev{
  id: string;
  author: string;
  name: string;
  profile_path: string;
  content: string;
  avatar_path:string
}

export default function Reviews({ movieId }:TMovieId) {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  useEffect(() => {
    setStatus(Status.PENDING);

    moviesAPI
      .fetchMovieReviews(movieId)
      .then(({ results }) => {
        setReviews(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);
  return (
    <>
      {status === Status.PENDING && <p>Download movie reviews</p>}
      {status === Status.REJECTED && <p>{error}</p>}

      {status === Status.RESOLVED && (
        <ul className={s.list}>
          {reviews.length === 0 && <p>There is no one review for this movie</p>}
          {reviews.map((review:IRewiev) => (
            <li key={review.id} className={s.item}>
              Author:
              <span className={s.author}>{review.author.toUpperCase()}</span>
              {review.profile_path && (
                <img
                  className={s.image}
                  src={`https://image.tmdb.org/t/p/w200${review.avatar_path}`}
                  alt={review.name}
                />
              )}
              <p className={s.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
Reviews.propTypes = {
  movieId: PropTypes.string,
};
