import { getLeaveRequest, getSingleLeaveRequest, addLeaveRequest, editLeaveRequest, removeLeaveRequest } from '../model/leaveRequestDB.js'

export const getLeaveRequestCon = async(req, res) => {
    try {
        res.json({ leave_request: await getLeaveRequest() })
    } catch(error) {
        console.log(error)
    }
}

export const addLeaveRequestCon = async(req, res) => {
    try {
        const { name, date, reason, status } = req.body;
        addLeaveRequest(name, date, reason, status)
        res.json({ message : "Leave request added",
                remaining_employees : await getLeaveRequest()
            })
    } catch(error) {
        console.log(error)
    }
}

export const editLeaveRequestCon = async(req, res) => {
    try {
        let {id ,status} = req.body
        let leaveRequest = await getSingleLeaveRequest(id)
        status ? status = status : status = leaveRequest.status
        await editLeaveRequest(id, status)
        res.json({ 
            message : "Leave request edited",
            leave_request : await getLeaveRequestCon()
        })
    } catch(error) {
        console.log(error)
    }
}

export const removeLeaveRequestCon = async(req, res) => {
    try {
        let id = req.params.id
        await removeLeaveRequest(id)
        res.json({ 
            message : "Leave request removed",
            leave_request : await getLeaveRequestCon() 
        })
    } catch(error) {
        console.log(error)
    }
}
