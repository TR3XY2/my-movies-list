import { MovieType } from "../types/MovieType";

export type WatchedMovieType = MovieType & {
  runtime: number;
  imdbRating: number;
  userRating: number;
};
