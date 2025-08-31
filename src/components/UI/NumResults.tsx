import { MovieType } from "../../types/MovieType";

type NumResultsProps = {
  movies: MovieType[];
};

export function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
