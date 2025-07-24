<template>
    <div class="attendance-container">
        <div class="controls">
            <h2>Employee Attendance</h2>
            <div>
                <input type="text" v-model="searchQuery" class="search-box" placeholder="Search employees...">
                <select v-model="selectedDate" class="date-filter">
                    <option value="">All Dates</option>
                    <option v-for="date in availableDates" :key="date" :value="date">{{ formatDate(date) }}</option>
                </select>
            </div>
        </div>

        <div class="master-date-control">
            <span class="master-date-label">Set Date for All:</span>
            <input type="date" v-model="masterDate" class="date-input" @change="updateAllDates">
        </div>

        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>✅ Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee, index) in attendanceAndLeave" :key="employee.employeeId">
                    <td>{{ index + 1 }}</td>
                    <td class="employee-cell">
                        <div class="avatar" :style="{ backgroundColor: getAvatarColor(employee.name) }">
                            {{ getInitials(employee.name) }}
                        </div>
                        {{ employee.name }}
                    </td>
                    <td>{{ employee.department || 'General' }}</td>
                    <td>
                        <input type="date" v-model="employee.currentDate" class="date-input employee-date"
                            @change="updateMasterDateIfUniform">
                    </td>
                    <td>
                        <span :class="getStatusClass(employee)">
                            {{ getCurrentStatus(employee) }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="legend">
            <div class="legend-item">
                <div class="legend-color" style="background-color: #27ae60;"></div>
                <span>Present</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color: #e74c3c;"></div>
                <span>Absent</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Attendance',
    props: ['info'],
    computed: {
        ...mapGetters(['attendanceWithCurrentDate']),

        attendanceAndLeave() {
        return this.attendanceWithCurrentDate;
        }
    },
    data() {
        return {
        searchQuery: '',
        selectedDate: '',
        masterDate: '',
        availableDates: []
        };
    },
    methods: {
        getAvatarColor(name) {
            // Simple color hash
            return '#3498db';
        },
        getInitials(name) {
            return name.split(' ').map(n => n[0]).join('');
        },
        getStatusClass(employee) {
            const status = this.getCurrentStatus(employee);
            if (employee.status === 'Present') return 'present';
            if (employee.status === 'Absent') return 'absent';
            return 'unknown';
        },
        getCurrentStatus(employee) {
            if (employee.attendance && employee.attendance.length > 0) {
                const record = employee.attendance.find(a => a.date === employee.currentDate);
                return record ? record.status : 'Unknown';
            }
            return 'Unknown';
        },
        updateMasterDateIfUniform() { },
        updateAllDates() {
            this.attendanceAndLeave.forEach(emp => {
                emp.currentDate = this.masterDate;
            });
        },
        formatDate(date) { return date; }
    }
}



</script>

<style scoped>
.attendance-container {
    max-width: 1000px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

h2 {
    color: #2c3e50;
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th {
    background-color: #133c58;
    color: white;
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
}

td {
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    vertical-align: middle;
}

tr:hover {
    background-color: #f8f9fa;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    margin-right: 10px;
}

.employee-cell {
    display: flex;
    align-items: center;
}

.present {
    color: #27ae60;
    font-weight: 600;
    background-color: #e8f5e9;
    padding: 5px 10px;
    border-radius: 4px;
}

.absent {
    color: #e74c3c;
    font-weight: 600;
    background-color: #ffebee;
    padding: 5px 10px;
    border-radius: 4px;
}



.date-input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
}

.controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
}

.search-box {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
}

.date-filter {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-left: 10px;
}

.legend {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    font-size: 14px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.legend-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
}

.master-date-control {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.master-date-label {
    font-weight: 600;
    color: #2c3e50;
}
</style>