<template>
    <div>
        <!-- Trigger Button -->
        <button class="open-btn animate__animated animate__backInLeft" @click="showModal = true">Open Pay Calculator</button>

        <!-- Modal Overlay -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <!-- Close Button -->
                <button class="close-btn" @click="showModal = false">X</button>

                <!-- Pay Calculator Content -->
                <div class="pay-calculator">
                    <h2>Pay Calculator</h2>
                    <div class="calculator-form">
                        <div class="input-group">
                            <label for="hourlyRate">Hourly Rate (R):</label>
                            <input id="hourlyRate" type="number" v-model.number="hourlyRate" min="0" step="0.01">
                            <label for="weeklyHours">Weekly Hours:</label>
                            <input id="weeklyHours" type="number" v-model.number="weeklyHours" min="0" max="168"
                                step="0.5">
                        </div>
                    </div>
                    <div class="results" v-if="showResults">
                        <div class="result-card">
                            <h3>Pay</h3>
                            <p>
                                <b>Weekly</b> : R{{ formatCurrency(weeklyPay) }} |
                                <b>Monthly</b> : R{{ formatCurrency(monthlyPay) }} |
                                <b>Yearly</b> : R{{ formatCurrency(yearlyPay) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showModal = ref(false);
const hourlyRate = ref(0);
const weeklyHours = ref(0);

const weeklyPay = computed(() => hourlyRate.value * weeklyHours.value);
const monthlyPay = computed(() => weeklyPay.value * 4.33);
const yearlyPay = computed(() => weeklyPay.value * 52);
const showResults = computed(() => hourlyRate.value > 0 && weeklyHours.value > 0);

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-ZA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};
</script>

<style>
.open-btn {
    background-color: #0b2545;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    width: 100%;
}

.open-btn:hover {
    background: linear-gradient(to right, #0b2545, #8da9c4);
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 15px;
    max-width: 600px;
    width: 100%;
    position: relative;
    animation: fadeIn 0.3s ease-in-out;
}

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: crimson;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    font-size: 1rem;
}

.pay-calculator {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 15px;
    background: linear-gradient(135deg, #0b2545, #8da9c4);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #2f4156;
    font-family: 'Arial', sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #ffffff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.calculator-form {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

label {
    font-weight: bold;
    color: #2f4156;
}

input {
    padding: 0.5rem;
    border: 1px solid #c8d9e6;
    border-radius: 5px;
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

input:focus {
    outline: none;
    border-color: #567c8d;
    box-shadow: 0 0 0 2px rgba(86, 124, 141, 0.2);
}

.results {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 1.5rem;
    border-radius: 10px;
}

.result-card {
    text-align: center;
}

h3 {
    margin-bottom: 1rem;
    color: #2f4156;
}

p {
    margin: 0;
    line-height: 1.6;
}

b {
    color: #567c8d;
}

@media (max-width: 600px) {
    .pay-calculator {
        padding: 1rem;
    }

    p {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    b {
        display: block;
        margin-top: 0.5rem;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>