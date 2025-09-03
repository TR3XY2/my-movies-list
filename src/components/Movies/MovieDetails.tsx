import { useEffect, useState } from "react";
import { StringLiteral } from "typescript";
import StarRating from "../UI/StarRating";
import { Loader } from "../UI/Loader";

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
  const [isLoading, setIsLoading] = useState(false);
  console.log(movie);

  useEffect(
    function () {
      async function getMovieDetails() {
        if (!apiKey) {
          return;
        }
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
        );

        const data: MovieType = await res.json();

        setMovie(data);
        setIsLoading(false);

      }

      getMovieDetails();
    },
    [selectedId, apiKey]
  );

  return (
    <div className="details">
      { isLoading ? <Loader /> : <>
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
        <section>
          <div className="rating">
            <StarRating maxRating={10} size={24}/>
          </div>
          <p>
            <em>{movie?.Plot}</em>
          </p>
          <p>Starring {movie?.Actors}</p>
          <p>Directed by {movie?.Director}</p>
        </section>
      </>}
    </div>
  );
}
