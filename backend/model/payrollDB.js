import { pool } from '../config/db.js'

export const getPayrolls = async() => {
    try{
        let [row] = await pool.query("SELECT employeeinformation.name, employeeinformation.position, payrolldata.hoursWorked, payrolldata.leaveDeductions, payrolldata.finalSalary FROM payrolldata INNER JOIN employeeinformation ON payrolldata.employeeId = employeeinformation.employeeId")
        return row
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