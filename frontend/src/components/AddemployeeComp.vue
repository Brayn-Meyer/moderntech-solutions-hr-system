<template>
    <div class="employee-form-container" ref="add_employee">
        <div class="form-wrapper">
            <h1 class="form-title">Add New Employee</h1>
            <form @submit.prevent="add_employee" class="employee-form">
                <div class="form-group">
                    <label for="eName">Full Name</label>
                    <input v-model="newEmployee.name" id="eName" name="eName" placeholder="Enter full name"
                        type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="ePosition">Position</label>
                    <input v-model="newEmployee.position" id="ePosition" name="ePosition"
                        placeholder="Enter position" type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="eDepartment">Department</label>
                    <select v-model="newEmployee.department" id="eDepartment" name="eDepartment"
                        class="form-input" required>
                        <option value="" disabled selected>Select department</option>
                        <option value="HR">Human Resources</option>
                        <option value="Finance">Finance</option>
                        <option value="IT">Information Technology</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Operations">Operations</option>
                        <option value="Sales">Sales</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="eSalary">Salary (R)</label>
                    <input v-model="newEmployee.salary" id="eSalary" name="eSalary" placeholder="Enter salary"
                        type="number" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="eEmploymentHistory">Employment History</label>
                    <textarea v-model="newEmployee.employmentHistory" id="eEmploymentHistory"
                        name="eEmploymentHistory" placeholder="Brief employment history"
                        class="form-input textarea-input"></textarea>
                </div>
                <div class="form-group">
                    <label for="eContact">Contact Information</label>
                    <input v-model="newEmployee.contact" id="eContact" name="eContact"
                        placeholder="Email or phone number" type="text" class="form-input" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">Add Employee</button>
                    <button type="button" @click="cancelForm" class="reset-btn">Cancel</button>
                </div>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            newEmployee: {
                name: "",
                position: "",
                department: "",
                salary: "",
                employmentHistory: "",
                contact: ""
            },
            errorMessage: "",
            successMessage: ""
        }
    },
    mounted() {
        this.toggle_add_employee_comp()
    },
    methods: {
        async add_employee() {
            this.errorMessage = "";
            this.successMessage = "";
            
            try {
                // Validate required fields
                if (!this.newEmployee.name || !this.newEmployee.position ||
                    !this.newEmployee.department || !this.newEmployee.salary ||
                    !this.newEmployee.contact) {
                    throw new Error("Please fill in all required fields");
                }
                // Send data to backend
                this.$store.dispatch("add_employee", this.newEmployee)
                
                // Reset form
                this.resetForm();
                
                // Hide form after 2 seconds
                setTimeout(() => {
                    this.toggle_add_employee_comp();
                    this.successMessage = "";
                }, 2000);
            } catch (error) {
                console.error("Error adding employee:", error);
                this.errorMessage = error.response?.data?.error || error.message || "Failed to add employee";
            }
        },
        resetForm() {
            this.newEmployee = { 
                employeeId: "", 
                name: "", 
                position: "", 
                department: "", 
                salary: "", 
                employmentHistory: "", 
                contact: "" 
            };
        },
        cancelForm() {
            this.resetForm();
            this.toggle_add_employee_comp();
            this.errorMessage = "";
            this.successMessage = "";
        },
        toggle_add_employee_comp() {
            this.visible = !this.visible;
            this.$refs.add_employee.style.display = this.visible ? 'none' : 'block';
        }
    }
}
</script>
<style>
.employee-form-container {
    display: none;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(47, 65, 86, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
}
.form-title {
    color: #2C3E50;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;
    font-size: 2rem;
}
.form-wrapper {
    max-width: 800px;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    padding: 2rem;
}
.employee-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}
.form-group {
    margin-bottom: 1rem;
}
.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4A5568;
    font-weight: 500;
    font-size: 0.9rem;
}
.form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #E2E8F0;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: #F8FAFC;
}
.form-input:focus {
    outline: none;
    border-color: #4299E1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
    background-color: #FFFFFF;
}
.textarea-input {
    min-height: 100px;
    resize: vertical;
}
select.form-input {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
}
.form-actions {
    grid-column: span 2;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
}
.submit-btn {
    background-color: #4299E1;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}
.submit-btn:hover {
    background-color: #3182CE;
    transform: translateY(-1px);
}
.reset-btn {
    background-color: #FFFFFF;
    color: #4A5568;
    border: 1px solid #E2E8F0;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}
.reset-btn:hover {
    background-color: #F7FAFC;
    border-color: #CBD5E0;
}
.error-message {
    color: #e53e3e;
    background-color: #fff5f5;
    padding: 0.75rem;
    border-radius: 6px;
    margin-top: 1rem;
    grid-column: span 2;
    border: 1px solid #fc8181;
    animation: fadeIn 0.3s ease-in-out;
}
.success-message {
    color: #38a169;
    background-color: #f0fff4;
    padding: 0.75rem;
    border-radius: 6px;
    margin-top: 1rem;
    grid-column: span 2;
    border: 1px solid #9ae6b4;
    animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
/* Responsive adjustments */
@media (max-width: 768px) {
    .employee-form {
        grid-template-columns: 1fr;
    }
    .form-actions {
        grid-column: span 1;
    }
    
    .error-message,
    .success-message {
        grid-column: span 1;
    }
}
</style>