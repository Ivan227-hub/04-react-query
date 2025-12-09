import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const API_KEY = "ВАШ_API_KEY"; // додай свій
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return data;
};
