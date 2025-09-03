import { useEffect, useState } from "react";
import { NavBar } from "./Navbar/NavBar";
import { Main } from "./Main/Main";
import { Search } from "./Search/Search";
import { NumResults } from "./UI/NumResults";
import { Box } from "./UI/Box";
import { MovieList } from "./Movies/MovieList";
import { WatchedMoviesList } from "./Movies/WatchedMoviesList";
import { WatchedSummary } from "./Movies/WatchedSummary";
import { tempMovieData } from "../data/tempMovieData";
import { tempWatchedData } from "../data/tempWatchedData";
import { MovieType } from "../types/MovieType";
import { WatchedMovieType } from "../types/WatchedMovieType";
import { Loader } from "./UI/Loader";
import { ErrorMessage } from "./UI/ErrorMessage";
import { MovieDetails } from "./Movies/MovieDetails";

const apiKey = process.env.REACT_APP_API_KEY;

export default function App() {
  const [movies, setMovies] = useState<MovieType[]>(tempMovieData);
  const [watched, setWatched] = useState<WatchedMovieType[]>(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("interstellar");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelectMovie(movieId : string) {
    setSelectedId(selectedId => movieId === selectedId ? null : movieId);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies!");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }

          setMovies(data.Search as MovieType[]);
          setError("");
        } catch (err) {
          setError(err instanceof Error ? err.message : String(err));
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} apiKey={apiKey}/>
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
