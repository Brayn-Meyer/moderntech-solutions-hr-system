import { pool } from '../config/db.js'

export const getSingleLeaveRequest = async(id) => {
    try{
        let [row] = await pool.query("SELECT * FROM leaverequests WHERE employeeId = ?", [id])
        return row
    } catch(error) {
        console.log(error)
    }
}