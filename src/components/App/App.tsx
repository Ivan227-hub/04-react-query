import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { fetchMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { toast, Toaster } from "react-hot-toast";
import type { Movie, MoviesResponse } from "../../types/movie";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const moviesQuery = useQuery<MoviesResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.length > 0,
    // в v5 keepPreviousData больше нет, вместо него можно использовать staleTime/cacheTime
    staleTime: 1000 * 60,  // 1 минута
  });

  const data = moviesQuery.data;

  const handleSearch = (newQuery: string) => {
    if (!newQuery) {
      toast.error("Введіть пошуковий запит");
      return;
    }
    setQuery(newQuery);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />

      {moviesQuery.isLoading && <Loader />}
      {moviesQuery.isError && <ErrorMessage message="Помилка завантаження" />}
      {moviesQuery.isSuccess && data?.results.length === 0 && toast("Фільми не знайдено")}

      {data && (
        <MovieGrid movies={data.results} onSelect={(movie) => setSelectedMovie(movie)} />
      )}

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}

      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
}
