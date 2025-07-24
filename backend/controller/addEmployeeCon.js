import { addEmployee } from '../model/addEmployeeDB.js'

export const addEmployeeCon = async(req, res) => {
    const { name, position, department, salary, employmentHistory, contact } = req.body;
    addEmployee(name, position, department, salary, employmentHistory, contact)
    res.json({ message : "employee added"})
};
