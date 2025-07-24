import PerformanceReview from '../models/performanceReviewDB.js'

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await PerformanceReview.getAll();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch performance reviews' });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await PerformanceReview.getById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
};

exports.createReview = async (req, res) => {
  try {
    const newReview = await PerformanceReview.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await PerformanceReview.update(req.params.id, req.body);
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await PerformanceReview.delete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};