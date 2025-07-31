import { createStore } from 'vuex'
import axios from 'axios'

const PORT = import.meta.env.VITE_PORT;

export default createStore({
    state: {
        employee_info: [],
        payroll_data: [],
        attendance: [],
        leave_request: [],
        performance_reviews: [],
        users: []
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
            return state.employee_info.reduce((sum, emp) => sum + (Number(emp.salary) || 0), 0);
        },
        pendingLeaveRequests: state => {
            return state.leave_request.filter(req => req.status === 'Pending').length;
        },
        approvedLeaveRequests: state => {
            return state.leave_request.filter(req => req.status === 'Approved').length;
        },
        deniedLeaveRequests: state => {
            return state.leave_request.filter(req => req.status === 'Denied').length;
        },
        getDepartmentFromName: (state) => (name) => {
            const employee = state.employee_info.find(e => e.name === name);
            return employee ? employee.department : null;
        },
    },
    mutations: {
        get_employee_info(state, payload) {
            state.employee_info = payload;
        },

        get_payroll_data(state, payload) {
            state.payroll_data = payload;
        },

        get_attendance(state, payload) {
            state.attendance = payload;
        },

        get_leave_request(state, payload) {
            state.leave_request = payload;
        },

        get_performance_reviews(state, payload) {
            state.performance_reviews = payload
        },

        get_users(state, payload) {
            state.users = payload
        }
    },
    actions: {
        async fetch_employee_info({ commit }) {
            let data = await axios.get(`http://localhost:${PORT}/employees`)
            commit('get_employee_info', data.data.employees)
            console.log(data.data.employees)
        },
        async fetch_payroll_info({ commit }) {
            let data = await axios.get(`http://localhost:${PORT}/payrolls`)
            commit('get_payroll_data', data.data.payrolls)
            console.log(data.data.payrolls)
        },
        async fetch_attendance_info({ commit }) {
            let data = await axios.get(`http://localhost:${PORT}/attendance`)
            commit('get_attendance', data.data.attendance)
            console.log(data.data.attendance)
        },
        async fetch_leave_request_info({ commit }) {
            let data = await axios.get(`http://localhost:${PORT}/leaverequest`)
            commit('get_leave_request', data.data.leave_request)
            console.log(data.data.leave_request)
        },
        async fetch_performance_reviews_info({ commit }) {
            let data = await axios.get(`http://localhost:${PORT}/performancereview`)
            commit('get_performance_reviews', data.data)
            console.log(data.data)
        },
        async fetch_users_info({ commit }) {
            let data = await axios.get(`http://localhost:${PORT}/login`)
            commit('get_users', data.data.users)
            console.log(data.data.users)
        },
        async fetch_users_password(payload) {
            return await axios.get(`http://localhost:${PORT}/login_password`, payload)
        },

        async add_employee({ dispatch }, payload) {
            await axios.post(`http://localhost:${PORT}/employees`, payload)
            dispatch("fetch_employee_info")
        },
        async add_leave_request({ dispatch }, payload) {
            await axios.post(`http://localhost:${PORT}/leaverequest`, payload)
            dispatch("fetch_leave_request_info")
        },
        async add_performance_review({ dispatch }, payload) {
            await axios.post(`http://localhost:${PORT}/performancereview`, payload)
            dispatch("fetch_performance_reviews_info")
        },
        async add_users({ dispatch }, payload) {
            await axios.post(`http://localhost:${PORT}/login`, payload)
            dispatch("fetch_users_info")
        },

        async edit_employee({ dispatch }, payload){
            await axios.patch(`http://localhost:${PORT}/employees`, payload)
            dispatch("fetch_employee_info")
        },
        async edit_payroll({ dispatch }, payload) {
            await axios.patch(`http://localhost:${PORT}/payrolls`, payload);
            dispatch("fetch_payroll_info");
        },
        async edit_leave_request({ dispatch }, payload) {
            await axios.patch(`http://localhost:${PORT}/leaverequest`, payload)
            dispatch("fetch_leave_request_info")
        },
        async edit_performance_review({ dispatch }, payload) {
            await axios.patch(`http://localhost:${PORT}/performancereview`, payload)
            dispatch("fetch_performance_reviews_info")
        },

        async remove_employee({ dispatch }, id) {
            await axios.delete(`http://localhost:${PORT}/employees/${id}`)
            dispatch("fetch_employee_info")
        },
        async remove_leave_request({ dispatch }, id) {
            await axios.delete(`http://localhost:${PORT}/leaverequest/${id}`)
            dispatch("fetch_leave_request_info")
        },
        async remove_performance_review({ dispatch }, id) {
            await axios.delete(`http://localhost:${PORT}/performancereview/${id}`)
            dispatch("fetch_performance_reviews_info")
        },

        check_password: async ({ }, payload) => {
            try {
                const response = await axios.post(`http://localhost:${PORT}/check_password`, payload);
                console.log('Password check result:', response.data.status);
                return response.data.status; // true or false
            } catch (error) {
                console.error('check_password error:', error);
                return false; // fail-safe fallback
            }
        }
    },
    modules: {
    }
})
