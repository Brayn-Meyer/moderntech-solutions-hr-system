<template>
  <div class="compact-leave-card animate__animated animate__backInUp">
    <div class="card-header">
      <div class="employee-info">
        <div class="avatar">{{ getInitials(info.name) }}</div>
        <div>
          <h3>{{ info.name }}</h3>
          <p>{{ info.department }}</p>
        </div>
      </div>
      <div class="status-summary">
        <span class="badge">{{ formatDate(info.date) }}</span>
        <span class="badge">{{ info.reason }}</span>
        <span class="badge">{{ info.status }}</span>
        <span v-if="this.info.status == 'Pending'">
          <button @click="editLeaveRequest(info.id, 'Approved')" class="approve-btn">Approve</button>
          <button @click="editLeaveRequest(info.id, 'Denied')" class="deny-btn">Deny</button>
        </span>
        <span>
          <button @click="showDeleteModal = true" class="remove-btn">Remove</button>
        </span>
      </div>
    </div>
  </div>

  
  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModal" class="modal-overlay">
    <div class="confirmation-modal">
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to delete this leave request?</p>
      <div class="modal-actions">
        <button @click="showDeleteModal = false" class="cancel-btn">
          Cancel
        </button>
        <button @click="deleteEmployee(info.id)" class="delete-btn">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CompactLeaveCard',
  props: ['info'],
  setup() {
    const showDeleteModal = ref(false);
    const store = useStore();

    const deleteEmployee = (id) => {
      store.dispatch('remove_leave_request', id);
      showDeleteModal.value = false;
    };

    return {
      showDeleteModal,
      deleteEmployee
    };
  },
  methods: {
    getInitials(name) {
      if (!name) return '';
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    },
    formatDate(dateStr) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-GB', options);
    },
    async editLeaveRequest(id, newStatus) {
      this.$store.dispatch('edit_leave_request', { id, status: newStatus });
    }
  }
};
</script>

<style scoped>
.compact-leave-card {
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(47, 65, 86, 0.1);
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #E0E8EE;
}

/* Header Section */
.card-header {
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(to right, #F5EFEB, #FFFFFF);
  border-bottom: 1px solid #D6E4F0;
  transition: all 0.2s ease;
}

.card-header:hover {
  background: linear-gradient(to right, #EDE6E2, #F5EFEB);
}

.employee-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #567C8D, #2F4156);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.employee-info h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #2F4156;
}

.employee-info p {
  margin: 3px 0 0;
  font-size: 12px;
  color: #7A8FA1;
}

.status-summary {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.badge.pending {
  background: linear-gradient(135deg, #FFF3BF, #FFE69E);
  color: #B35900;
}

.badge.approved {
  background: linear-gradient(135deg, #D3F9D8, #B2F2BB);
  color: #1A5E2B;
}

.badge.denied {
  background: linear-gradient(135deg, #FFD3D3, #FFB8B8);
  color: #991B1B;
}

.toggle-icon {
  font-size: 13px;
  color: #567C8D;
  margin-left: 8px;
  transition: transform 0.2s;
}

/* Expanded Content */
.card-body {
  padding: 8px 16px;
  background-color: #FFFFFF;
}

.request-item {
  display: flex;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #F0F5F9;
  transition: background-color 0.2s;
}

.request-item:hover {
  background-color: #F8FAFC;
}

.request-item:last-child {
  border-bottom: none;
}

.request-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 42px;
  padding: 4px;
  background-color: #F5F9FC;
  border-radius: 6px;
}

.request-date .day {
  font-size: 16px;
  font-weight: 600;
  color: #2F4156;
}

.request-date .month {
  font-size: 10px;
  text-transform: uppercase;
  color: #7A8FA1;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.request-details {
  flex-grow: 1;
}

.request-details .reason {
  margin: 0;
  font-size: 13px;
  color: #3A4D61;
  line-height: 1.5;
}

.request-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.status {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.status.pending {
  background: linear-gradient(135deg, #FFF3BF, #FFE69E);
  color: #B35900;
}

.status.approved {
  background: linear-gradient(135deg, #D3F9D8, #B2F2BB);
  color: #1A5E2B;
}

.status.denied {
  background: linear-gradient(135deg, #FFD3D3, #FFB8B8);
  color: #991B1B;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.actions button i {
  font-size: 11px;
}

.btn-approve {
  background: linear-gradient(135deg, #10B981, #0D9E6E);
  color: white;
}

.btn-approve:hover {
  background: linear-gradient(135deg, #0D9E6E, #10B981);
  transform: translateY(-1px);
}

.btn-deny {
  background: linear-gradient(135deg, #EF4444, #DC2626);
  color: white;
}

.btn-deny:hover {
  background: linear-gradient(135deg, #DC2626, #EF4444);
  transform: translateY(-1px);
}

/* Animation for expanding */
.card-body {
  animation: fadeIn 0.3s ease-out;
}

.approve-btn {
  background-color: #20AC43;
  border: none;
  border-radius: 2px;
  height: 30px;
  width: 70px;
  color: white;
  margin-right: 2px;
  cursor: pointer;
}

.approve-btn:hover {
  background-color: #20bd47;
}

.deny-btn {
  background-color: #D41717;
  border: none;
  border-radius: 2px;
  height: 30px;
  width: 70px;
  color: white;
  margin-right: 2px;
  cursor: pointer;
}

.deny-btn:hover {
  background-color: #e81414;
}

.remove-btn {
  background-color: #2f4156;
  border: none;
  border-radius: 2px;
  height: 30px;
  width: 70px;
  color: white;
  margin-right: 2px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #3a4d61
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
</style>