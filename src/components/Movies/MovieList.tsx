import { MovieType } from "../../types/MovieType";
import { Movie } from "./Movie";

type MovieListProps = {
  movies: MovieType[];
  onSelectMovie: (movieId: string) => void;
};

export function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
      ))}
    </ul>
  );
}
