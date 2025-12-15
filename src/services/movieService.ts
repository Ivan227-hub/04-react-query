import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number; // добавляем сюда
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const response = await axios.get(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  // TMDB реально возвращает total_results, поэтому просто приводим тип
  return response.data as MoviesResponse;
};
