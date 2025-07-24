<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal">
            <div class="modal-header">
                <h2>{{ employee.name }}'s Details</h2>
                <div class="initials">{{ initials }}</div>
            </div>
            <div class="modal-content">
                <div class="detail-row">
                    <span class="detail-label">Position:</span>
                    <span class="detail-value">{{ employee.position }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Department:</span>
                    <span class="detail-value">{{ employee.department }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Salary:</span>
                    <span class="detail-value">R {{ employee.salary.toLocaleString() }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Employment History:</span>
                    <span class="detail-value">{{ employee.employmentHistory }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Contact:</span>
                    <span class="detail-value">{{ employee.contact }}</span>
                </div>
            </div>
            <button class="close-btn" @click="$emit('close')">Close</button>
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
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(47, 65, 86, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
}

.modal {
    background: linear-gradient(to bottom right, #ffffff 0%, #f5efeb 100%);
    padding: 2.5rem;
    border-radius: 16px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 12px 36px rgba(47, 65, 86, 0.25);
    border: 1px solid #c8d9e6;
    position: relative;
    overflow: hidden;
}

.modal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #0b2545, #8da9c4);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(200, 217, 230, 0.5);
}

.modal-header h2 {
    color:#0b2545;
    font-size: 1.5rem;
    margin: 0;
}

.initials {
    background: linear-gradient(135deg, #0b2545, #8da9c4);
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-weight: bold;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(47, 65, 86, 0.15);
}

.modal-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(200, 217, 230, 0.3);
}

.detail-row:last-child {
    border-bottom: none;
}

.detail-label {
    font-weight: 600;
    color: #0b2545;
    font-size: 0.95rem;
}

.detail-value {
    color: #0b2545;
    text-align: right;
    max-width: 60%;
    word-break: break-word;
}

.close-btn {
    margin-top: 2rem;
    background-color: #0b2545;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    width: 100%;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(47, 65, 86, 0.1);
}

.close-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(47, 65, 86, 0.2);
}

@media (max-width: 600px) {
    .modal {
        padding: 1.5rem;
    }
    
    .modal-header h2 {
        font-size: 1.3rem;
    }
    
    .detail-row {
        flex-direction: column;
        gap: 0.3rem;
    }
    
    .detail-value {
        max-width: 100%;
        text-align: left;
    }
}
</style>