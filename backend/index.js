import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'

import { getEmployeeCon, addEmployeeCon, editEmployeeCon, removeEmployeeCon } from './controller/employeeCon.js'

import { getPayrollCon, editPayrollCon } from './controller/payrollCon.js'

import { getAttendanceCon } from './controller/attendanceCon.js'

import { getLeaveRequestCon, addLeaveRequestCon, editLeaveRequestCon, removeLeaveRequestCon } from './controller/leaveRequestCon.js'

import { getPerformanceReviewsCon, getSinglePerformanceReviewsCon, addPerformanceReviewsCon, editPerformanceReviewsCon, removePerformanceReviewsCon } from './controller/performanceReviewCon.js';

import { getUsersCon, checkPasswordCon, addUsersCon } from './controller/loginCon.js'

config()

const app = express()
let PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.get("/employees", getEmployeeCon)
app.post('/employees', addEmployeeCon)
app.patch('/employees', editEmployeeCon)
app.delete("/employees/:id", removeEmployeeCon)

app.get("/payrolls", getPayrollCon)
app.patch("/payrolls", editPayrollCon)

app.get("/attendance", getAttendanceCon)

app.get("/leaverequest", getLeaveRequestCon)
app.post("/leaverequest", addLeaveRequestCon)
app.patch('/leaverequest', editLeaveRequestCon)
app.delete("/leaverequest/:id", removeLeaveRequestCon)

app.get('/performancereview', getPerformanceReviewsCon)
app.get('/performancereview/:id', getSinglePerformanceReviewsCon)
app.post('/performancereview', addPerformanceReviewsCon)
app.patch('/performancereview', editPerformanceReviewsCon)
app.delete('/performancereview/:id', removePerformanceReviewsCon)

app.get('/login', getUsersCon)
app.post('/check_password', checkPasswordCon)
app.post('/login', addUsersCon)

// lets app be accessed from line/hosting
app.listen(PORT, () => {
    console.log("Link : " + `http://localhost:${PORT}`)
})