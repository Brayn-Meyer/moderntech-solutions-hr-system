import { getPerformanceReviews, getSinglePerformanceReviews, addPerformanceReviews, editPerformanceReviews, removePerformanceReviews } from '../model/performanceReviewDB.js'

export const getPerformanceReviewsCon = async (req, res) => {
  try {
    const reviews = await getAll();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch performance reviews' });
  }
};

export const getSinglePerformanceReviewsCon = async (req, res) => {
  try {
    const review = await getById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
};

export const addPerformanceReviewsCon = async (req, res) => {
  try {
    const newReview = await create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

export const editPerformanceReviewsCon = async (req, res) => {
  try {
    const updatedReview = await update(req.params.id, req.body);
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

export const removePerformanceReviewsCon = async (req, res) => {
  try {
    await deleteReviewDB(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};