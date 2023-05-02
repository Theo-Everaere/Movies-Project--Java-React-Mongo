package dev.theoeve.movies.service;

import dev.theoeve.movies.models.Movie;
import dev.theoeve.movies.models.Review;
import dev.theoeve.movies.repository.ReviewRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String imdbId){
    Review review = reviewRepository.insert(new Review(reviewBody));

    mongoTemplate.update(Movie.class)
            .matching(Criteria.where("imdbId").in(imdbId))
            .apply(new Update().push("reviewsId").value(review))
            .first();

    return review;
    }

}
