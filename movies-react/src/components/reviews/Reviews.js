import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import MovieReviews from "./MovieReviews";

const Reviews = ({ getMovieData, movie, reviews = [], setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  const [loading, setLoading] = useState(true);
  const [fetchedReviews, setFetchedReviews] = useState([]);

  useEffect(() => {
    getMovieData(movieId);
    axios
      .get(`http://localhost:8080/api/v1/movies/imdb/${movieId}`)
      .then((response) => {
        setFetchedReviews(response.data.reviewsId);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    if (
      !rev ||
      typeof rev !== "object" ||
      rev === null ||
      !rev.value ||
      rev.value.trim() === ""
    ) {
      alert("Please enter a valid review");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      const updatedReviews = [...reviews, { body: rev.value }];

      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          <MovieReviews reviews={fetchedReviews?.concat(reviews)} />
        </Col>
      </Row>

      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>{movie?.title}</h3>
          <p>Genres:</p>
          <ul>
            {movie?.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
