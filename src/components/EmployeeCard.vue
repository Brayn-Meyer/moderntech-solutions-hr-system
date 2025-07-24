<template>
    <div class="employee-card">
        <div class="card-header">
            <div class="initials">{{ initials }}</div>
            <div class="main-info">
                <h2>{{ employee.name }}</h2>
                <p class="subtitle"><strong>Position:</strong> {{ employee.position }} <br> <strong>Department:</strong>
                    {{ employee.department }}</p>
            </div>
        </div>
        <div class="actions">
            <button class="view" @click="$emit('view', employee)">View</button>
            <!-- <button class="edit">Edit</button> -->
            <button class="delete" @click="$emit('delete', employee)">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['employee'],
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
    background-color: rgb(208, 203, 203);
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
</style>