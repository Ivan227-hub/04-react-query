import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.card}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "https://via.placeholder.com/300x450"
            }
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </li>
      ))}
    </ul>
  );
}
