import { pool } from '../config/db.js'

export const getLeaveRequest = async() => {
    try{
        let [row] = await pool.query("SELECT leaverequests.id, employeeinformation.name, employeeinformation.department, leaverequests.date, leaverequests.reason, leaverequests.status FROM leaverequests INNER JOIN employeeinformation ON leaverequests.employeeId = employeeinformation.employeeId")
        return row
    } catch(error) {
        return error 
    }
}

export const getSingleLeaveRequest = async(id) => {
    try{
        let [row] = await pool.query("SELECT * FROM leaverequests WHERE id = ?", [id])
        return row
    } catch(error) {
        console.log(error)
    }
}

export const addLeaveRequest = async(name, date, reason, status) => {
    const [rows] = await pool.query(
        'SELECT employeeId FROM employeeinformation WHERE name = ?',
        [name]
    );
    if (rows.length === 0) {
        throw new Error('Employee not found');
    }

    const employeeId = rows[0].employeeId;

    pool.query('INSERT INTO leaverequests (employeeId, date, reason, status) VALUES (?, ?, ?, ?)',
    [employeeId, date, reason, status], (err, result) => {
    if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, ...req.body });
    });

    // export const addLeaveRequest = async (name, date, reason) => {
    // Step 1: Get employee ID from name
    // const [rows] = await db.query(
    //     'SELECT employee_id FROM employees WHERE name = ?',
    //     [name]
    // );

    // if (rows.length === 0) {
    //     throw new Error('Employee not found');
    // }

    // const employeeId = rows[0].employee_id;

    // Step 2: Insert into leave_requests
    // await db.query(
    //     'INSERT INTO leave_requests (employee_id, date, reason) VALUES (?, ?, ?)',
    //     [employeeId, date, reason]
    // );
    // };
}

export const editLeaveRequest = async(id, status) => {
    await pool.query(`UPDATE leaverequests SET status = ? WHERE id = ?;`, 
    [status, id])
}

export const removeLeaveRequest = async(id) => {
    try{
        await pool.query('DELETE FROM leaverequests WHERE id = ?;', [id])
    } catch(error) {
        return  error 
    }
}
