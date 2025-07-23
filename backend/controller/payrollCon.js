import { getPayrolls } from '../model/payrollDB.js'

export const getPayrollCon = async(req, res) => {
    res.json({ payrolls: await getPayrolls() })
}