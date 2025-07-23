import { getAttendance } from '../model/attendanceDB.js'

export const getAttendanceCon = async(req, res) => {
    res.json({ attendance: await getAttendance() })
}