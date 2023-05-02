import axios from "axios";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// Components
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Reviews from "./components/reviews/Reviews";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const allMoviesUrl = "http://localhost:8080/api/v1/movies";

  const getMovies = async () => {
    try {
      await axios.get(allMoviesUrl).then((res) => {
        const movies = res.data;
        console.log("----- getMovies movies: " + movies);
        setMovies(movies);
      });
    } catch (err) {
      console.log("----- getMovies Error : " + err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/movies/imdb/${movieId}`
      );

      const singleMovie = response?.data;

      console.log("SingleMovie: " + JSON.stringify(singleMovie));
      setMovie(singleMovie);

      console.log(
        "SingleMovie Reviews: " + JSON.stringify(singleMovie.reviewsId)
      );

      setReviews(singleMovie.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/trailer/:ytTrailerId" element={<Trailer />} />
          <Route
            path="/reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
