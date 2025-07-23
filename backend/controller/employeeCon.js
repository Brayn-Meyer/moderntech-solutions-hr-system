import { getEmployees } from '../model/employeeDB.js'

export const getEmployeeCon = async(req, res) => {
    res.json({ employees: await getEmployees() })
}