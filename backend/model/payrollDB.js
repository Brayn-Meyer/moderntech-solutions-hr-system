import { pool } from '../config/db.js'

export const getPayrolls = async() => {
    try{
        let [row] = await pool.query("SELECT employeeinformation.name, employeeinformation.position, payrolldata.hoursWorked, payrolldata.leaveDeductions, payrolldata.finalSalary FROM payrolldata INNER JOIN employeeinformation ON payrolldata.employeeId = employeeinformation.employeeId")
        return row
    } catch(error) {
        return error
    }
}

export const editPayroll = async(name, hoursWorked, leaveDeductions) => {
    try{
        const [rows] = await pool.query('SELECT employeeId FROM employeeinformation WHERE name = ?',
        [name]);

        if (rows.length === 0) {
        throw new Error('Employee not found');
        }

        const employeeId = rows[0].employeeId;

        await pool.query(`UPDATE payrolldata SET hoursWorked = ?, leaveDeductions = ? WHERE employeeId = ?;`,
        [hoursWorked, leaveDeductions, employeeId])
    } catch(error) {
        return error
    }
}

// SELECT 
//     employees.name AS employee_name,
//     departments.department_name
// FROM 
//     employees
// INNER JOIN 
//     departments
// ON 
//     employees.department_id = departments.department_id;