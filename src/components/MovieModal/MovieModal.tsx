import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root");

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.close}
          aria-label="Закрити модальне вікно"
          onClick={onClose}
        >
          ✕
        </button>

        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
          />
        )}

        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>Дата релізу: {movie.release_date}</p>
        <p>Рейтинг: {movie.vote_average}</p>
      </div>
    </div>,
    modalRoot
  );
}
