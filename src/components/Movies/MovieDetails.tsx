import { useEffect, useState } from "react";
import StarRating from "../UI/StarRating";
import { Loader } from "../UI/Loader";
import { WatchedMovieType } from "../../types/WatchedMovieType";

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
  onCloseMovie: () => void;
  apiKey: string | undefined;
  onAddWatched: (movie: WatchedMovieType) => void;
  watched: WatchedMovieType[];
};

export function MovieDetails({
  selectedId,
  onCloseMovie,
  apiKey,
  onAddWatched,
  watched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  console.log(movie);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie: WatchedMovieType = {
      imdbID: selectedId,
      imdbRating: Number(movie?.imdbRating),
      Title: movie?.Title ?? "",
      Year: movie?.Year ?? "",
      Poster: movie?.Poster ?? "",
      runtime: Number(movie?.Runtime.split(" ").at(0)),
      userRating: userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        if (!apiKey) return;
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
          );
          if (!res.ok) throw new Error("Network error");
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovie(data);
        } catch (err) {
          console.error(err);
          setMovie(null);
        } finally {
          setIsLoading(false);
        }
      }

      getMovieDetails();
    },
    [selectedId, apiKey]
  );

  useEffect(
    function () {
      document.title = `Movie | ${movie?.Title ?? ""} `;
    },
    [movie?.Title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
              {watched.some((movie) => movie.imdbID === selectedId) ? (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Starring {movie?.Actors}</p>
            <p>Directed by {movie?.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
