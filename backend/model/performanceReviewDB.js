import { pool } from '../config/db.js';

class PerformanceReview {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM performancereviews');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM performancereviews WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(reviewData) {
    const { employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status } = reviewData;
    
    const [result] = await pool.query(
      'INSERT INTO performancereviews (employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status]
    );
    
    return this.getById(result.insertId);
  }

  static async update(id, reviewData) {
    const { employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status } = reviewData;
    
    await pool.query(
      'UPDATE performancereviews SET employeeId = ?, employeeName = ?, department = ?, reviewDate = ?, rating = ?, strengths = ?, areasForImprovement = ?, goals = ?, status = ? WHERE id = ?',
      [employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status, id]
    );
    
    return this.getById(id);
  }

  static async delete(id) {
    await pool.query('DELETE FROM performancereviews WHERE id = ?', [id]);
    return true;
  }
}