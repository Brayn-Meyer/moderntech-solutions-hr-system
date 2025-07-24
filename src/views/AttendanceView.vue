<template>
    <navbar-comp />

    <div class="attendance-container">
        <div class="controls">
            <h2><i class="fas fa-clipboard-check"></i> Employee Attendance</h2>
            <div class="search-container">
                <input type="text" v-model="searchQuery" class="search-box" placeholder="Search employees...">
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
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee, index) in filteredEmployees" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td class="employee-cell">
                        <div class="avatar" :style="{ background: getAvatarGradient(employee.name) }">
                            {{ getInitials(employee.name) }}
                        </div>
                        {{ employee.name }}
                    </td>
                    <td>{{ employee.department || 'General' }}</td>
                    <td>
                        <input type="date" :value="formatDate(employee.date)" @change="updateDate($event, employee)"
                            class="date-input employee-date" />
                    </td>
                    <td>
                        <span :class="getStatusClass(employee.status)">
                            {{ employee.status }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="legend">
            <div class="legend-item">
                <div class="legend-color present"></div>
                <span>Present</span>
            </div>
            <div class="legend-item">
                <div class="legend-color absent"></div>
                <span>Absent</span>
            </div>
            <div class="legend-item">
                <div class="legend-color unknown"></div>
                <span>Unknown</span>
            </div>
        </div>
    </div>
    <div>

    </div>

    <footer-comp />
</template>
<script>
import FooterComp from '@/components/FooterComp.vue';
import NavbarComp from '@/components/NavbarComp.vue';
export default {
    components: {
        NavbarComp,
        FooterComp
    },

    name: 'Attendance',
    data() {
        const masterDate = '2025-07-27';
        return {
            masterDate,
            searchQuery: '',
            selectedDate: '',
            availableDates: []
        };
    },
    methods: {
        getStatusClass(status) {
            switch (status?.toLowerCase()) {
                case 'present':
                    return 'status present';
                case 'absent':
                    return 'status absent';
                case 'leave':
                    return 'status leave';
                default:
                    return 'status unknown';
            }
        },
        capitalizeStatus(status) {
            if (!status) return 'Unknown';
            return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        },
        getInitials(name) {
            return name?.split(" ").map(n => n[0]).join("").toUpperCase();
        },
        getAvatarGradient(name) {
            // Simple gradient generator
            const colors = ["#4f46e5", "#6366f1", "#3b82f6"];
            const index = name.length % colors.length;
            return `linear-gradient(135deg, ${colors[index]}, #a5b4fc)`;
        },
        getCurrentStatus(employee) {
            if (Array.isArray(employee.attendance)) {
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
        formatDate(date) {
            if (!date) return '';
            return new Date(date).toISOString().split('T')[0]; // "2025-07-27"
        },
        updateDate(event, employee) {
            employee.date = event.target.value;
        }
    },
    computed: {
        attendanceAndLeave() {
            if (!Array.isArray(this.$store.state.attendance)) return [];
            return this.$store.state.attendance.map(att => {
                const empInfo = this.$store.state.employee_info?.find(e => e.employeeId === att.employeeId) || {};

                return {
                    ...att,
                    name: empInfo.name || 'Unknown',
                    department: empInfo.department || 'General',
                    currentDate: this.masterDate,
                    attendance: att.attendance || [] // ensure it's an array
                };
            });
        },
        filteredEmployees() {
            const map = new Map();
            this.$store.state.attendance.forEach(entry => {
                if (!map.has(entry.name) || new Date(entry.date) > new Date(map.get(entry.name).date)) {
                    map.set(entry.name, entry);
                }
            });
            return Array.from(map.values());
        }
    }
}
</script>
<style scoped>
.attendance-container {
    max-width: 1200px;
    margin: 2rem auto;
    background: linear-gradient(to bottom, #ffffff 0%, #f5efeb 100%);
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(47, 65, 86, 0.12);
    padding: 2rem;
    border: 1px solid #c8d9e6;
}

h2 {
    color: #0b2545;
    margin: 0;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: linear-gradient(to right, transparent 0%, rgba(245, 239, 235, 0.6) 20%, transparent 100%);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1.5rem;
    font-size: 0.95rem;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(86, 124, 141, 0.1);
}

th {
    background-color: #0b2545;
    color: #f5efeb;
    padding: 1.1rem;
    text-align: center;
    font-weight: 500;
    position: relative;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

th:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #c8d9e6 0%, #f5efeb 100%);
}

td {
    padding: 1.1rem;
    border-bottom: 1px solid #e0e7ed;
    vertical-align: middle;
    color: #2f4156;
    background: white;
    transition: all 0.25s ease;
}

tr:last-child td {
    border-bottom: none;
}

tr:hover td {
    background: linear-gradient(to right, #ffffff 0%, #f8fafc 100%);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(86, 124, 141, 0.1);
}

.avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    margin-right: 0.75rem;
    font-size: 0.95rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.employee-cell {
    display: flex;
    align-items: center;
    font-weight: 500;
}

.status.present {
    color: #27ae60;
    font-weight: 500;
    background: linear-gradient(to right, rgba(39, 174, 96, 0.1) 0%, rgba(46, 204, 113, 0.1) 100%);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    display: inline-block;
    border: 1px solid rgba(39, 174, 96, 0.3);
}

.status.absent {
    color: #e52b2b;
    font-weight: 500;
    background: linear-gradient(to right, rgba(229, 43, 43, 0.1) 0%, rgba(255, 107, 107, 0.1) 100%);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    display: inline-block;
    border: 1px solid rgba(229, 43, 43, 0.3);
}

.status.unknown {
    color: #567c8d;
    font-weight: 500;
    background: linear-gradient(to right, rgba(86, 124, 141, 0.1) 0%, rgba(192, 214, 223, 0.1) 100%);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    display: inline-block;
    border: 1px solid rgba(86, 124, 141, 0.3);
}

.date-input {
    padding: 0.6rem 1rem;
    border: 1px solid #d6e3f0;
    border-radius: 6px;
    font-family: inherit;
    background: white;
    color: #2f4156;
    font-size: 0.95rem;
    transition: all 0.25s ease;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.date-input:focus {
    outline: none;
    border-color: #567c8d;
    box-shadow: 0 0 0 3px rgba(86, 124, 141, 0.2);
}

.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.search-box {
    padding: 0.6rem 1.2rem;
    border: 1px solid #d6e3f0;
    border-radius: 6px;
    width: 280px;
    background: white;
    color: #2f4156;
    font-size: 0.95rem;
    transition: all 0.25s ease;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-box:focus {
    outline: none;
    border-color: #567c8d;
    box-shadow: 0 0 0 3px rgba(86, 124, 141, 0.2);
}

.legend {
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    font-size: 0.9rem;
    flex-wrap: wrap;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.7);
}

.legend-color {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.legend-color.present {
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
}

.legend-color.absent {
    background: linear-gradient(135deg, #e52b2b 0%, #ff6b6b 100%);
}

.legend-color.unknown {
    background: linear-gradient(135deg, #567c8d 0%, #7a9cc6 100%);
}

.master-date-control {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(to right, #f5efeb 0%, #ffffff 50%, #f5efeb 100%);
    padding: 0.8rem 1.2rem;
    border-radius: 8px;
    border-left: 4px solid #0b2545;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.master-date-label {
    font-weight: 500;
    color: #2f4156;
    font-size: 0.95rem;
}

.attendance-cards-container {
    max-width: 1200px;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    padding: 0 1rem;
}

@media (max-width: 768px) {
    .controls {
        flex-direction: column;
        align-items: stretch;
    }

    .search-box {
        width: 100%;
    }

    table {
        display: block;
        overflow-x: auto;
    }

    .attendance-cards-container {
        grid-template-columns: 1fr;
        padding: 0 0.5rem;
    }

    .master-date-control {
        flex-direction: column;
        align-items: flex-start;
    }
}

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>