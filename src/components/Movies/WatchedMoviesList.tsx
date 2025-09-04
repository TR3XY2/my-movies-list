import { WatchedMovie } from "./WatchedMovie";
import { WatchedMovieType } from "../../types/WatchedMovieType";

type WatchedMoviesListProps = {
  watched: WatchedMovieType[];
  onDeleteWatched: (id : string) => void;
};

export function WatchedMoviesList({ watched, onDeleteWatched }: WatchedMoviesListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>
      ))}
    </ul>
  );
}
