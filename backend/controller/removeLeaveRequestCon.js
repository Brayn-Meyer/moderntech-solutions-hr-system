import { removeLeaveRequest } from '../model/removeLeaveRequestDB.js'

export const removeLeaveRequestCon = async(req, res) => {
    let id = req.params.id
    await removeLeaveRequest(id)
}