import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map(movie => (
        <li key={movie.id} className={css.card}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : ""
            }
            alt={movie.title}
            onClick={() => onSelect(movie)}
          />
          <h3>{movie.title}</h3>
        </li>
      ))}
    </ul>
  );
}
