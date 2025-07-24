import { editLeaveRequest } from '../model/editLeaveRequestDB.js'
import { getSingleLeaveRequest } from '../model/singleLeaveRequestDB.js'

export const editLeaveRequestCon = async(req, res) => {
    let {id ,status} = req.body
    let leaveRequest = await getSingleLeaveRequest(id)

    status ? status = status : status = leaveRequest.status

    await editLeaveRequest(id, status)
}