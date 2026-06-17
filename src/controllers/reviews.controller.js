import * as reviewsService from '../services/reviews.service.js';

export const getReviews = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const reviews = await reviewsService.getReviewsByProductId(productId);
    res.status(200).json({ ok: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    const newReview = await reviewsService.createReview(productId, userId, rating, comment);
    res.status(201).json({ ok: true, data: newReview });
  } catch (error) {
    next(error);
  }
};