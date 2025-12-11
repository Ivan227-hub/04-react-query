export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}
