import { removeEmployee } from '../model/removeEmployeeDB.js'

export const removeEmployeeCon = async(req, res) => {
    let id = req.params.id
    await removeEmployee(id)
}