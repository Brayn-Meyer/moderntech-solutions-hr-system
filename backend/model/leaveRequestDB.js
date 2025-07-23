import { pool } from '../config/db.js'

export const getLeaveRequest = async() => {
    try{
        let [row] = await pool.query("SELECT employeeinformation.name, employeeinformation.department, leaverequests.date, leaverequests.reason, leaverequests.status FROM leaverequests INNER JOIN employeeinformation ON leaverequests.employeeId = employeeinformation.employeeId")
        return row
    } catch(error) {
        return error 
    }
}