import { pool } from '../config/db.js'

export const getEmployees = async() => {
    try{
        let [row] = await pool.query("SELECT * FROM employeeinformation")
        return row
    } catch(error) {
        return error 
    }
}

export const addEmployee = async(name, position, department, salary, employmentHistory, contact) => {
    pool.query('INSERT INTO employeeinformation (name, position, department, salary, employmentHistory, contact) VALUES (?, ?, ?, ?, ?, ?)', 
    [name, position, department, salary, employmentHistory, contact], (err, result) => {
    if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, ...req.body });
    });
}

export const removeEmployee = async(id) => {
    try{
        await pool.query('DELETE FROM attendancerecords WHERE employeeId = ?;', [id])
        await pool.query('DELETE FROM payrolldata WHERE employeeId = ?;', [id])
        await pool.query('DELETE FROM leaverequests WHERE employeeId = ?;', [id])
        await pool.query(`DELETE FROM employeeinformation WHERE employeeId = ?;`, [id])
    } catch(error) {
        return  error 
    }
}

