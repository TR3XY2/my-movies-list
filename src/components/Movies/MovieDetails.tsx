import { useEffect, useState } from "react";
import { StringLiteral } from "typescript";

type MovieType = {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
};

type MovieDetailsProps = {
  selectedId: string;
  onCloseMovie: React.MouseEventHandler<HTMLButtonElement>;
  apiKey: string | undefined;
};

export function MovieDetails({
  selectedId,
  onCloseMovie,
  apiKey,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieType | null>(null);

  console.log(movie);

  useEffect(
    function () {
      async function getMovieDetails() {
        if (!apiKey) {
          return;
        }

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
        );

        const data: MovieType = await res.json();

        setMovie(data);
      }

      getMovieDetails();
    },
    [selectedId, apiKey]
  );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={movie?.Poster} alt={`Poster of ${movie?.Title} movie`} />
        <div className="details-overview">
          <h2>{movie?.Title}</h2>
          <p>
            {movie?.Released} &bull; {movie?.Runtime}
          </p>
          <p>{movie?.Genre}</p>
          <p>
            <span>⭐</span>
            {movie?.imdbRating} IMDb rating
          </p>
        </div>
      </header>
    </div>
  );
}
