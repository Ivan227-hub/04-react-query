import axios from "axios";
import type { Movie } from "../types/movie";

// Базовый URL TMDB API
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

// Импортируем API ключ из переменных окружения
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

// Интерфейс для ответа от API
export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Функция для получения фильмов
export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing. Check your .env file.");
  }

  const response = await axios.get<MoviesResponse>(BASE_URL, {
    params: {
      query,
      page,
      api_key: API_KEY, // используем API key для v3
      language: "uk-UA", // можно указать язык
    },
  });

  return response.data;
};
