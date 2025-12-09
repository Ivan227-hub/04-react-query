import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieList from "../components/MovieList/MovieList";
import { fetchMovies } from "../api/movies";
import type { MoviesResponse } from "../types/movie";
import styles from "./App.module.css";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // useQuery під v5
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: (): Promise<MoviesResponse> => fetchMovies(query, page),
    enabled: !!query,
  });

  const totalPages = data?.total_pages ?? 0;

  // Типізуємо selectedItem вручну
  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  return (
    <div>
      <SearchBar
        onSubmit={(value) => {
          setQuery(value);
          setPage(1);
        }}
      />

      {isLoading && <p className={styles.msg}>Loading...</p>}
      {isError && <p className={styles.msg}>Something went wrong</p>}

      {data && <MovieList movies={data.results} />}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
};

export default App;
