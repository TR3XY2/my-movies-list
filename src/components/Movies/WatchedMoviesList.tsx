import { WatchedMovie } from "./WatchedMovie";
import { WatchedMovieType } from "../../types/WatchedMovieType";

type WatchedMoviesListProps = {
  watched: WatchedMovieType[];
};

export function WatchedMoviesList({ watched }: WatchedMoviesListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
