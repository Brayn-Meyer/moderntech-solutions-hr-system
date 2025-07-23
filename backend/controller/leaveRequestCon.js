import { getLeaveRequest } from '../model/leaveRequestDB.js'

export const getLeaveRequestCon = async(req, res) => {
    res.json({ leave_request: await getLeaveRequest() })
}