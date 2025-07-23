import { pool } from '../config/db.js'

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