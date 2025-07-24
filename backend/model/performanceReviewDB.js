import db from '../config/db.js';

class PerformanceReview {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM performancereviews');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM performancereviews WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(reviewData) {
    const { employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status } = reviewData;
    
    const [result] = await db.query(
      'INSERT INTO performancereviews (employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status]
    );
    
    return this.getById(result.insertId);
  }

  static async update(id, reviewData) {
    const { employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status } = reviewData;
    
    await db.query(
      'UPDATE performancereviews SET employeeId = ?, employeeName = ?, department = ?, reviewDate = ?, rating = ?, strengths = ?, areasForImprovement = ?, goals = ?, status = ? WHERE id = ?',
      [employeeId, employeeName, department, reviewDate, rating, strengths, areasForImprovement, goals, status, id]
    );
    
    return this.getById(id);
  }

  static async delete(id) {
    await db.query('DELETE FROM performancereviews WHERE id = ?', [id]);
    return true;
  }
}

module.exports = PerformanceReview;