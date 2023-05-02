const MovieReviews = ({ reviews }) => {
  return (
    <div>
      <h2>Reviews</h2>
      {reviews?.length > 0 ? (
        <ul>
          {reviews?.map((review, index) => (
            <li key={index}>{review.body}</li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default MovieReviews;
