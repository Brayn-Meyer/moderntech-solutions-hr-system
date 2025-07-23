import express from 'express'
import {config} from 'dotenv'
import { pool } from './config/db.js'
import cors from 'cors'

import { getEmployeeCon } from './controller/employeeCon.js'
import { removeEmployeeCon } from './controller/removeEmployeeCon.js'

import { getPayrollCon } from './controller/payrollCon.js'
import { getAttendanceCon } from './controller/attendanceCon.js'
import { getLeaveRequestCon } from './controller/leaveRequestCon.js'

config()

const app = express()
let PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.get("/employees", getEmployeeCon)
app.get("/payrolls", getPayrollCon)
app.get("/attendance", getAttendanceCon)
app.get("/leaverequest", getLeaveRequestCon)

app.delete("/employees/:id", removeEmployeeCon)

// lets app be accessed from line/hosting
app.listen(PORT, () => {
    console.log("Link : " + `http://localhost:${PORT}`)
})