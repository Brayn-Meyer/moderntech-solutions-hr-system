import { pool } from '../config/db.js'

export const editLeaveRequest = async(id, status) => {
    await pool.query(`UPDATE leaverequests SET status = ? WHERE employeeId = ?;`, 
    [status, id])
}