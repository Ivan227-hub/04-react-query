import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { fetchMovies } from "../../api/movies";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./App.module.css";

interface AppProps {}

export default function App({}: AppProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.length > 0,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("search") as HTMLInputElement;
    setQuery(input.value.trim());
    setPage(1);
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input type="text" name="search" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>

      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Помилка завантаження" />}

      {data && <MovieGrid movies={data.results} />}

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
