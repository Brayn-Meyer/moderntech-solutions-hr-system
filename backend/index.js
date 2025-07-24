import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'

import { getEmployeeCon } from './controller/employeeCon.js'
import { removeEmployeeCon } from './controller/removeEmployeeCon.js'

import { getPayrollCon } from './controller/payrollCon.js'
import { getAttendanceCon } from './controller/attendanceCon.js'
import { getLeaveRequestCon } from './controller/leaveRequestCon.js'

import { addEmployeeCon } from './controller/addEmployeeCon.js'

import { editLeaveRequestCon } from './controller/editLeaveRequestCon.js'
import { removeLeaveRequestCon } from './controller/removeLeaveRequestCon.js'

import {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} from '../backend/controller/performanceReviewCon.js';

config()

const app = express()
let PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.get("/employees", getEmployeeCon)
app.get("/payrolls", getPayrollCon)
app.get("/attendance", getAttendanceCon)
app.get("/leaverequest", getLeaveRequestCon)

app.post('/add_employees', addEmployeeCon);

app.patch('/edit_leave_request', editLeaveRequestCon)

app.delete("/employees/:id", removeEmployeeCon)
app.delete("/leaverequest/:id", removeLeaveRequestCon)

app.get('/performancereview', getAllReviews);
app.get('/performancereview/:id', getReviewById);
app.post('/performancereview', createReview);
app.put('/performancereview/:id', updateReview);
app.delete('/performancereview/:id', deleteReview);

// lets app be accessed from line/hosting
app.listen(PORT, () => {
    console.log("Link : " + `http://localhost:${PORT}`)
})