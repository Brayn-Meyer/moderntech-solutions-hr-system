import { pool } from '../config/db.js';

export const getPerformanceReviews = async () => {
  const [rows] = await pool.query('SELECT * FROM performancereviews');
  return rows;
}

export const getSinglePerformanceReviews = async (id) => {
  const [rows] = await pool.query('SELECT * FROM performancereviews WHERE id = ?', [id]);
  return rows[0];
}

export const addPerformanceReviews = async (reviewData) => {
  const { employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status } = reviewData;
  
  const [result] = await pool.query(
    'INSERT INTO performancereviews (employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status]
  );
  
  return this.getSinglePerformanceReviews(result.insertId);
}

export const editPerformanceReviews = async (id, reviewData) => {
  const { employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status } = reviewData;
  
  await pool.query(
    'UPDATE performancereviews SET employeeId = ?, employeeName = ?, department = ?, reviewDate = ?, rating = ?, strengths = ?, areasForImprovement = ?, goals = ?, status = ? WHERE id = ?',
    [employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status, id]
  );
  
  return this.getSinglePerformanceReviews(id);
}

export const removePerformanceReviews = async (id) => {
  await pool.query('DELETE FROM performancereviews WHERE id = ?', [id]);
  return true;
}