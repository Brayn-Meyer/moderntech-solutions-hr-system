import { pool } from '../config/db.js'

export const getAttendance = async() => {
    try{
        let [row] = await pool.query("SELECT employeeinformation.name, employeeinformation.department, attendancerecords.date, attendancerecords.status FROM attendancerecords INNER JOIN employeeinformation ON attendancerecords.employeeId = employeeinformation.employeeId")
        return row
    } catch(error) {
        return error
    }
}