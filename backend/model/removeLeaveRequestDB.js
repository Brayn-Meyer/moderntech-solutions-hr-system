import { pool } from '../config/db.js'

export const removeLeaveRequest = async(id) => {
    try{
        await pool.query('DELETE FROM leaverequests WHERE id = ?;', [id])
    } catch(error) {
        return  error 
    }
}