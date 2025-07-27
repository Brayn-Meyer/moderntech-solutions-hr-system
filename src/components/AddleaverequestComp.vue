<template>
  <div>
    <button class="open-form-button" @click="showForm = true">
      <i class="fas fa-calendar-plus"></i> Request Leave
    </button>

    <!-- Modal -->
    <div v-if="showForm" class="modal-overlay">
      <div class="modal-content leave-form-container">
        <!-- Close Button -->
        <button class="close-button" @click="showForm = false">
          &times;
        </button>

        <!-- Form Header -->
        <div class="form-header">
          <h2 class="title"> New Leave Request</h2>
          <p class="form-subtitle">Submit your leave application</p>
        </div>

        <!-- Leave Form -->
        <form @submit.prevent="submitLeaveRequest" class="leave-form">
          <div class="form-group">
            <label for="employeeName">Employee Name</label>
            <select id="employeeName" v-model="newRequest.name" required class="form-input">
              <option disabled value="">Select an employee</option>
              <option v-for="employee in this.$store.state.employee_info" :key="employee.employeeId" :value="employee.name">
                {{ employee.name }}
              </option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="leaveDate">Leave Date</label>
              <input
                id="leaveDate"
                v-model="newRequest.date"
                type="date"
                required
                class="form-input"
              />
            </div>
          </div>

          <!-- <div class="form-row">
            <div class="form-group">
              <label for="leaveDepartment">Department</label>
              <select id="leaveDepartment" v-model="newRequest.department" required class="form-input">
                <option disabled value="">Select department</option>
                <option v-for="employee in this.$store.state.employee_info" :key="employee.employeeId" :value="employee.department">
                  {{ employee.department }}
                </option>
              </select>
            </div>
          </div> -->

          <div class="form-group">
            <label for="leaveReason">Reason for Leave</label>
            <textarea
              id="leaveReason"
              v-model="newRequest.reason"
              placeholder="Briefly explain the reason for leave"
              required
              class="form-textarea"
              rows="4"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-button">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      newRequest: {
        name: "",
        department: this.employeeDepartment,
        date: "",
        reason: "",
        status: "Pending"
      }
    };
  },
  computed: {
    employeeDepartment() {
      return this.$store.getters.getDepartmentFromName(this.name);
    }
  },
  methods: {
    submitLeaveRequest() {
      // if (!this.validateForm()) return;

      this.$store.dispatch("add_leave_request", this.newRequest);
      this.resetForm();
      this.showSuccessNotification();
      this.showForm = false;
    },
    // validateForm() {
    //   if (!this.newRequest.name.trim()) {
    //     this.showError("Please enter employee name");
    //     return false;
    //   }
    //   if (!this.newRequest.date) {
    //     this.showError("Please select a leave date");
    //     return false;
    //   }
    //   if (!this.newRequest.department.trim()) {
    //     this.showError("Please provide a department");
    //     return false;
    //   }
    //   if (!this.newRequest.reason.trim()) {
    //     this.showError("Please provide a reason for leave");
    //     return false;
    //   }
    //   return true;
    // },
    showError(message) {
      alert(message);
    },
    showSuccessNotification() {
      alert("Leave request submitted successfully!");
    },
    resetForm() {
      this.newRequest = {
        name: "",
        leaveRequests: [
          {
            date: "",
            reason: "",
            status: "Pending"
          }
        ]
      };
    }
  }
};
</script>

<style scoped>

.open-form-button {
  background-color: #0b2545;
  color: #f5efeb;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.open-form-button:hover {
  background-color: rgba(28, 43, 60, 0.6);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(47, 65, 86, 0.2);
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(47, 65, 86, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal Content (Form Box) */
.modal-content {
  position: relative;
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  animation: fadeInScale 0.3s ease-in-out;
}

/* Close Button */
.close-button {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #f5efeb;
  background-color: #f1121d;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-weight: bold;
  line-height: 1;
}

.title {
  color: #0b2545;
}

.form-subtitle {
  color: #0b2545;
}

.submit-button {
  background-color: #0b2545;
  border-radius: 9px;
  border: none;
  color: #f5efeb;
  height: 40px;
  width: 130px;
  font-weight: bold;
  cursor: pointer;
}

/* Modal Animation */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>