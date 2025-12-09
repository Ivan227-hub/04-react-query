import React from "react";
import styles from "./MovieList.module.css";
import type { Movie } from "../../types/movie";

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className={styles.placeholder}>No image</div>
          )}

          <p>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
