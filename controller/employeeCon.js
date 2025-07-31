import { getEmployees, addEmployee, editEmployee, removeEmployee } from '../model/employeeDB.js'

export const getEmployeeCon = async (req, res) => {
    try {
        res.json({ employees: await getEmployees() })
    } catch (error) {
        console.log(error)
    }
}

export const addEmployeeCon = async (req, res) => {
    try {
        const { name, position, department, salary, employmentHistory, contact } = req.body;
        addEmployee(name, position, department, salary, employmentHistory, contact)
        res.json({
            message: "Employee added",
            remaining_employees: await getEmployeeCon()
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const editEmployeeCon = async (req, res) => {
    try {
        let { name, position, department, salary, employmentHistory, contact, employeeId } = req.body
        await editEmployee(name, position, department, salary, employmentHistory, contact, employeeId)
        res.json({
            message: "Employee edited",
            payrolls: await getEmployees()
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const removeEmployeeCon = async (req, res) => {
    try {
        let id = req.params.id
        await removeEmployee(id)
        res.json({
            message: "Employee removed",
            remaining_employees: await getEmployees()
        })
    } catch (error) {
        console.log(error)
    }
}
