import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import EmployeeView from '@/views/EmployeePage.vue'
import PayrollView from '@/views/PayrollView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import LeaveRequestView from '@/views/LeaveRequest.vue'
import PerformanceReview from '@/views/PerformanceReview.vue'
import LoginView from '@/views/LoginView.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: HomeView,
    meta: { title: 'Dashboard' }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'About' }
  },
  {
    path: '/employee',
    name: 'employee',
    component: EmployeeView,
    meta: { title: 'Employees' }
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: PayrollView,
    meta: { title: 'Payroll' }
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: AttendanceView,
    meta: { title: 'Attendance' }
  },
  {
    path: '/leaverequest',
    name: 'leaverequest',
    component: LeaveRequestView,
    meta: { title: 'Leave Requests' }
  },
  {
    path: '/performancereview',
    name: 'performanceView',
    component: PerformanceReview,
    meta: { title: 'Performance Review' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const appName = 'Modern Tech Solutions'

router.afterEach((to) => {
  const pageTitle = to.meta?.title
  document.title = pageTitle ? `${pageTitle} | ${appName}` : appName
})

export default router
