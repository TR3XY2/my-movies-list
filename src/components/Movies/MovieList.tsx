import { MovieType } from "../../types/MovieType";
import { Movie } from "./Movie";

type MovieListProps = {
  movies: MovieType[];
};

export function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
