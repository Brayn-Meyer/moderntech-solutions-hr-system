<template>
    <div class="employee-card animate__animated animate__backInUp">
        <div class="card-header">
            <div class="initials">{{ initials }}</div>
            <div class="main-info">
                <h2>{{ employee.name }}</h2>
                <br>
                <p class="subtitle"><strong>Position:</strong> {{ employee.position }} <br> <strong>Department:</strong>
                    {{ employee.department }}</p>
            </div>
        </div>
        <div class="actions">
            <button class="view" @click="$emit('view', employee)">View</button>
            <button class="edit" @click="editEmployee()">Edit</button>
            <button class="delete" @click="showDeleteModal = true">Delete</button>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
        <div class="confirmation-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this employee?</p>
            <div class="modal-actions">
                <button @click="showDeleteModal = false" class="cancel-btn">
                    Cancel
                </button>
                <button @click="deleteEmployee()" class="delete-btn">
                    Delete
                </button>
            </div>
        </div>
    </div>

    <div class="edit-modal-overlay" v-if="showEditModal">
        <div class="edit-modal">
            <div class="edit-modal-header">
                <h2>Edit {{ currentEmployeeName }}</h2>
            </div>

            <form @submit.prevent="applyEditEmployee">
                <div class="edit-form-group">
                    <label>Name</label>
                    <input v-model="editForm.name" required />
                </div>

                <div class="edit-form-group">
                    <label>Position</label>
                    <input v-model="editForm.position" required />
                </div>

                <div class="edit-form-group">
                    <label>Department</label>
                    <input v-model="editForm.department" required />
                </div>

                <div class="edit-form-group">
                    <label>Salary</label>
                    <input v-model="editForm.salary" type="number" required />
                </div>

                <div class="edit-form-group">
                    <label>Employement History</label>
                    <input v-model="editForm.employmentHistory" required />
                </div>

                <div class="edit-form-group">
                    <label>Contact</label>
                    <input v-model="editForm.contact" required />
                </div>

                <div class="edit-modal-actions">
                    <button type="submit" class="edit-save-btn">Save</button>
                    <button type="button" class="edit-cancel-btn" @click="showEditModal = false">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, toRaw } from 'vue';
import { useStore } from 'vuex';
export default {
    props: ['employee'],
    setup(props, { emit }) {
        const showDeleteModal = ref(false);
        const showEditModal = ref(false);
        const store = useStore();
        const currentEmployeeName = ref("");
        const editForm = ref({
            name: "",
            position: "",
            department: "",
            salary: "",
            employmentHistory: "",
            contact: "",
            employeeId: props.employee.employeeId
        })

        const deleteEmployee = () => {
            emit('delete', props.employee);
            showDeleteModal.value = false;
        };

        const editEmployee = () => {
            showEditModal.value = true
            currentEmployeeName.value = props.employee.name
            editForm.value = {
                name: props.employee.name,
                position: props.employee.position,
                department: props.employee.department,
                salary: props.employee.salary,
                employmentHistory: props.employee.employmentHistory,
                contact: props.employee.contact,
                employeeId: props.employee.employeeId
            }
        }

        const applyEditEmployee = () => {
            store.dispatch("edit_employee", toRaw(editForm.value));
            showEditModal.value = false
        }

        return {
            showDeleteModal,
            deleteEmployee,
            showEditModal,
            editForm,
            editEmployee,
            applyEditEmployee
        }
    },
    computed: {
        initials() {
            return this.employee.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
        }
    },
    methods: {
        openModal(employee) {
            this.selectedEmployee = employee;
        }
    }
}
</script>

<style scoped>
.employee-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 1.8rem;
    box-shadow: 0 6px 20px rgba(47, 65, 86, 0.12);
    transition: all 0.3s ease;
    gap: 1.5rem;
    position: relative;
    overflow: hidden;
}

.employee-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(86, 124, 141, 0.2);
}

.employee-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #0b2545, #8da9c4);
}

.card-header {
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.initials {
    background-color: #0b2545;
    color: white;
    border-radius: 50%;
    width: 65px;
    height: 65px;
    font-weight: bold;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(47, 65, 86, 0.15);
}

.main-info h2 {
    margin: 0 0 0.8rem;
    font-size: 1.3rem;
    color: #2f4156;
    font-weight: 600;
}

.main-info p {
    margin: 0.3rem 0;
    font-size: 0.95rem;
    color: #567c8d;
}

.subtitle {
    margin: 6px 0;
    color: #567c8d;
    font-size: 0.95rem;
    line-height: 1.5;
}

.subtitle strong {
    color: #2f4156;
    font-weight: 600;
}

.actions {
    display: flex;
    gap: 0.8rem;
    margin-top: auto;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(200, 217, 230, 0.5);
}

button {
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
    font-size: 0.9rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.view {
    background-color: #0b2545;
    color: white;
}

.edit {
    background-color: #0b2545;
    color: white;
}

.delete {
    background-color: #d32d2d;
    color: white;
}

@media (max-width: 480px) {
    .employee-card {
        padding: 1.2rem;
    }

    .actions {
        flex-direction: column;
        gap: 0.6rem;
    }

    .initials {
        width: 50px;
        height: 50px;
        font-size: 1.1rem;
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(47, 65, 86, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
}

.confirmation-modal {
    background-color: white;
    padding: 25px;
    border-radius: 8px;
    width: 90%;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
    text-align: center;
    box-shadow: 0 4px 25px rgba(47, 65, 86, 0.2);
    border: 1px solid #d6e4f0;
}

.confirmation-modal h3 {
    margin-top: 0;
    font-size: 1.3rem;
    color: #2f4156;
    margin-bottom: 15px;
}

.confirmation-modal p {
    color: #567c8d;
    margin-bottom: 25px;
    font-size: 15px;
}

.modal-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
}

.cancel-btn {
    background-color: #0b2545;
    color: white;
    border: 1px solid #d6e4f0;
    padding: 0.6rem 1.4rem;
    border-radius: 6px;
    font-size: 0.95rem;
    cursor: pointer;
}

.cancel-btn:hover {
    background-color: #f5f9ff;
    color: #0b2545;
    border-color: #8da9c4;
}

.delete-btn {
    background-color: #b82323;
    color: white;
    padding: 0.6rem 1.4rem;
    border: none;
    border-radius: 6px;
    font-size: 0.95rem;
    cursor: pointer;
}

.delete-btn:hover {
    background: linear-gradient(135deg, #fa5252, #ff6b6b);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .modal-actions {
        flex-direction: column;
    }

    .cancel-btn,
    .delete-btn {
        width: 100%;
    }
}

.edit-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(47, 65, 86, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    backdrop-filter: blur(4px);
}

.edit-modal {
    background: linear-gradient(to bottom right, #ffffff, #f5efeb);
    padding: 2rem;
    border-radius: 16px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 12px 36px rgba(47, 65, 86, 0.25);
}

.edit-modal-header {
    margin-bottom: 1rem;
    border-bottom: 1px solid #c8d9e6;
}

.edit-modal-header h2 {
    margin: 0;
    color: #0b2545;
}

.edit-form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

label {
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: #0b2545;
}

input {
    padding: 0.6rem;
    border-radius: 6px;
    border: 1px solid #c8d9e6;
    font-size: 0.95rem;
}

.edit-modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

.edit-save-btn {
    background-color: #0b2545;
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}

.edit-cancel-btn {
    background-color: #d32d2d;
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}
</style>