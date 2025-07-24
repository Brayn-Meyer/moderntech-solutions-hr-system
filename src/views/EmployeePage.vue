<template>
    <navbar-comp/>
    <div class="employee-container">
        <h1>Employee List</h1>
        <div class="top-bar">
            <button class="add-btn" @click="add_employee_button()">+ Add Employee</button>
        </div>
        <div>
            <AddemployeeComp ref="add_employee"/>
        </div>
        <div class="card-grid" ref="cards">
            <EmployeeCard
                v-for="emp in this.$store.state.employee_info"
                :key="emp.id"
                :employee="emp"
                @view="openModal"
                @delete="deleteEmployee"
            />
        </div>
        <EmployeeModal
            v-if="selectedEmployee"
            :employee="selectedEmployee"
            @close="selectedEmployee = null"
        />
    </div>
    <footer-comp/>
</template>

<script>
import { employeeInformation } from '@/store/employee_info.json';
import EmployeeCard from '@/components/EmployeeCard.vue';
import EmployeeModal from '@/components/EmployeeModal.vue';
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import AddemployeeComp from '@/components/AddemployeeComp.vue'

export default {
    components: {
        EmployeeCard,
        NavbarComp,
        FooterComp,
        AddemployeeComp,
        EmployeeModal
    },
    data() {
        return {
            add_employee_cliked: false,
            employees: employeeInformation,
            selectedEmployee: null,
            searchQuery: ''
        }
    },
    computed: {
        filteredEmployees() {
            return this.employees.filter(emp => 
                emp.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        getEmployees() {
            return this.$store.state.employee_info
        }
    },
    methods: {
        add_employee_button(){
            this.$refs.add_employee.toggle_add_employee_comp()
        },
        deleteEmployee(employee) {
            const index = this.$store.state.employee_info.findIndex(
                emp => emp.employeeId === employee.employeeId
            );
            if (index !== -1) {
                this.$store.dispatch("remove_employee", employee.employeeId);
            }
        },
        openModal(employee) {
            this.selectedEmployee = employee;
        }
    }
}
</script>

<style scoped>
.employee-container {
    max-width: 1500px;
    margin: 0 auto;
    padding: 3rem;
    min-height: calc(100vh - 120px);
    background-color: white;
}

h1 {
    color: #0b2545;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 4rem;
    padding: 1rem;
}

.top-bar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    padding: 0 1rem;
}

.add-btn {
    background: linear-gradient(135deg, #0b2545, #8da9c4);
    color: white;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.add-btn:hover {
    background-color: #364FC7;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
    .employee-container {
        padding: 1.5rem;
    }
    
    .card-grid {
        grid-template-columns: 1fr;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    .top-bar {
        justify-content: center;
    }
}
</style>