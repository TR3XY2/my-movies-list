import { useState } from "react";
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

export default function App() {
  const [movies, setMovies] = useState<MovieType[]>(tempMovieData);
  const [watched, setWatched] = useState<WatchedMovieType[]>(tempWatchedData);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        </Box>
      </Main>
    </>
  );
}
