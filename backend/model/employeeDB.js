import { pool } from '../config/db.js'

export const getEmployees = async() => {
    try{
        let [row] = await pool.query("SELECT * FROM employeeinformation")
        return row
    } catch(error) {
        return error 
    }
}

export const addEmployee = async (name, position, department, salary, employmentHistory, contact) => {
  try {
    await pool.query('INSERT INTO employeeinformation (name, position, department, salary, employmentHistory, contact) VALUES (?, ?, ?, ?, ?, ?)',
      [name, position, department, salary, employmentHistory, contact]
    );

    const [rows] = await pool.query('SELECT employeeId FROM employeeinformation WHERE name = ?',
      [name]);

    if (rows.length === 0) {
      throw new Error('Employee not found');
    }

    const employeeId = rows[0].employeeId;

    await pool.query('INSERT INTO payrolldata (employeeId, hoursWorked, leaveDeductions, finalSalary) VALUES (?, ?, ?, ?)',
      [employeeId, 160, 0, Number(salary)]);
  } catch (err) {
    throw new Error('Database error: ' + err.message);
  }
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

