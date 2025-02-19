import express from "express";
import { getMovieDetails, getMoviesByCategory, getMovieTrailer, getNowPlayingMovies, getRecommendationMovies, getSimilarMovies, getTrendingMovie } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/nowPlaying", getNowPlayingMovies);
router.get("/:id/trailer", getMovieTrailer);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:id/recommendations", getRecommendationMovies);
router.get("/:category", getMoviesByCategory);

export default router;