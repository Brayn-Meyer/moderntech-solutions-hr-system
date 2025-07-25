import { getEmployees, addEmployee, removeEmployee } from '../model/employeeDB.js'

export const getEmployeeCon = async(req, res) => {
    try {
        res.json({ employees: await getEmployees() })
    } catch(error) {
        console.log(error)
    }
}

export const addEmployeeCon = async(req, res) => {
    try {
        const { name, position, department, salary, employmentHistory, contact } = req.body;
        addEmployee(name, position, department, salary, employmentHistory, contact)
        res.json({ message : "Employee added",
                remaining_employees : await getEmployeeCon()
            })
    } catch(error) {
        console.log(error)
    }
};

export const removeEmployeeCon = async(req, res) => {
    try {
        let id = req.params.id
        await removeEmployee(id)
        res.json({ 
            message : "Employee removed",
            remaining_employees : await getEmployeeCon() 
        })
    } catch(error) {
        console.log(error)
    }
}
