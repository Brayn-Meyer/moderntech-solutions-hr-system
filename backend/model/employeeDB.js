import { pool } from '../config/db.js'

export const getEmployees = async() => {
    try{
        let [row] = await pool.query("SELECT * FROM employeeinformation")
        return row
    } catch(error) {
        return error 
    }
}