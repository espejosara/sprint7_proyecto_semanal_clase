import Review from '../models/review.model.js';

export const getReviewsByProductId = async (productId) => {
  return await Review.find({ productId }).sort({ createdAt: -1 });
};

export const createReview = async (productId, userId, rating, comment) => {
  const newReview = new Review({ productId, userId, rating, comment });
  return await newReview.save();
};