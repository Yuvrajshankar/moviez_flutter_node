import express from "express";
import { getPopularTv, getRecommendationTv, getSimilarTv, getTrendingTv, getTvDetails, getTvKeywords, getTvsByCategory, getTvTrailers } from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/popular", getPopularTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTv);
router.get("/:id/recommendations", getRecommendationTv);
router.get("/:id/keywords", getTvKeywords);
router.get("/:category", getTvsByCategory);

export default router;