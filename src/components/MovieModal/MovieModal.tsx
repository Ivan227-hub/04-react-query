import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
