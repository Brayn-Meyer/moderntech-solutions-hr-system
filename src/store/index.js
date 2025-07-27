import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        employee_info: [],
        payroll_data: [],
        attendance: [],
        leave_request: [],
    },
    getters: {
        attendanceWithCurrentDate: state => {
            return state.attendance.map(emp => ({
                ...emp,
                currentDate: emp.attendance && emp.attendance.length > 0
                    ? emp.attendance[emp.attendance.length - 1].date
                    : ''
            }));
        },
        combinedSalaries: state => {
            return state.employee_info.reduce((total, item) => total + item.salary, 0);
        },
        getDepartmentFromName: (state) => (name) => {
            const employee = state.employee_info.find(e => e.name === name);
            return employee ? employee.department : null;
        }
    },
    mutations: {
        get_employee_info(state, payload) {
            state.employee_info = payload;
        },
        add_to_employee_info(state, payload) {
            state.employee_info.push(payload)
        },
        remove_employee(state, index) {
            state.employee_info.splice(index, 1);
        },

        update_attendance(payload) { //payload is any info 
            this.state.attendance = payload
        },
        add_to_attendance(state, payload) {
            state.attendance.push(payload)
        },

        get_payroll_data(state, payload) {
            state.payroll_data = payload;
        },
        add_to_payroll_data(payload) {
            this.state.payroll_data.push(payload)
        },

        // updateLeaveStatus(state, payload) {
        //     const { empIndex, reqIndex, newStatus } = payload;
        //     state.attendance[empIndex].leaveRequests[reqIndex].status = newStatus;
        // },

        get_attendance(state, payload) {
            state.attendance = payload;
        },

        get_leave_request(state, payload) {
            state.leave_request = payload;
        }
    },
    actions: {
        async fetch_employee_info({ commit }) {
            let data = await axios.get('http://localhost:3315/employees')
            commit('get_employee_info', data.data.employees)
            console.log(data.data.employees)
        },
        async fetch_payroll_info({ commit }) {
            let data = await axios.get('http://localhost:3315/payrolls')
            commit('get_payroll_data', data.data.payrolls)
            console.log(data.data.payrolls)
        },
        async fetch_attendance_info({ commit }) {
            let data = await axios.get('http://localhost:3315/attendance')
            commit('get_attendance', data.data.attendance)
            console.log(data.data.attendance)
        },
        async fetch_leave_request_info({ commit }) {
            let data = await axios.get('http://localhost:3315/leaverequest')
            commit('get_leave_request', data.data.leave_request)
            console.log(data.data.leave_request)
        },

        async add_employee({ dispatch }, employee) {
            await axios.post('http://localhost:3315/employees', employee)
            dispatch("fetch_employee_info")
        },
        async add_leave_request({ dispatch }, leave_request) {
            await axios.post('http://localhost:3315/leaverequest', leave_request)
            dispatch("fetch_leave_request_info")
        },

        async edit_payroll({ dispatch }, payload) {
            await axios.patch('http://localhost:3315/payrolls', payload);
            dispatch("fetch_payroll_info");
        },
        async edit_leave_request({ dispatch }, payload) {
            await axios.patch('http://localhost:3315/leaverequest', payload)
            dispatch("fetch_leave_request_info")
            // console.log(data.data.leave_request)
        },

        async remove_employee({ dispatch }, id) {
            await axios.delete(`http://localhost:3315/employees/${id}`)
            dispatch("fetch_employee_info")
            // console.log(data.data.employees)
        },
        async remove_leave_request({ dispatch }, id) {
            await axios.delete(`http://localhost:3315/leaverequest/${id}`)
            dispatch("fetch_leave_request_info")
            // console.log(data.data.employees)
        }
    },
    modules: {
    }
})
