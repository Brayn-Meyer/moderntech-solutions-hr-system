import { pool } from '../config/db.js'

export const addEmployee = async(name, position, department, salary, employmentHistory, contact) => {
    pool.query('INSERT INTO employees (name, position, hourlyRate, hoursWorked, leaveDeductions) VALUES (?, ?, ?, ?, ?)', 
    [name, position, hourlyRate, hoursWorked, leaveDeductions], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, ...req.body });
    });
}