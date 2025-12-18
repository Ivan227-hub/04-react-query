import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}


const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWZkNDUxMWQ3OGQzZTg1N2IyOGMxM2M4YzQ1N2NiOSIsIm5iZiI6MTc2NDY3Nzk4OS42NDksInN1YiI6IjY5MmVkOTY1NDVjZmU4NGUxNjI2ZjNkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kudrzA3OazjiYVuWZnmFvrkra4T0eI3InwXrJbmXy4Y"; 
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
