import axios from "axios";
import type { MoviesResponse } from "../types/movie"; // ← ТАК правильно

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const response = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return response.data;
};
