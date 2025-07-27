import { getPayrolls, editPayroll } from '../model/payrollDB.js'

export const getPayrollCon = async(req, res) => {
    res.json({ payrolls: await getPayrolls() })
}
export const editPayrollCon = async(req, res) =>{
    let {name, hoursWorked, leaveDeductions} = req.body
    await editPayroll(name, hoursWorked, leaveDeductions)
            res.json({ 
                message : "Payroll edited",
                payrolls : await getPayrolls()
            })

}
