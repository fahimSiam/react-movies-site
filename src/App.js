import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
//be79fc4b
const API_URL = "http://www.omdbapi.com/?apikey=be79fc4b";
const movie1 = {
  Title: "The Avengers",
  Year: "2012",
  imdbID: "tt0848228",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
};
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`, { method: "GET" });
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("marvel");
  }, []);
  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
