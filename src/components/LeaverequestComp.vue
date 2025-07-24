<template>
  <div class="compact-leave-card">
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
          <button @click="editLeaveRequest('Approve')">Approve</button>
          <button @click="editLeaveRequest('Denied')">Deny</button>
        </span>
        <span>
          <button @click="removeRequest()">Remove</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CompactLeaveCard',
  props: ['info'],
  methods: {
    getInitials(name) {
      if (!name) return '';
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    },
    formatDate(dateStr) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-GB', options);
    },
    async editLeaveRequest(newStatus){
      await axios.patch('http://localhost:3315/edit_leave_request', {id:this.info.id, status:newStatus });
      this.$store.dispatch("fetch_leave_request_info"); // <-- Add this line
    },
    removeRequest(){
      this.$store.dispatch("remove_leave_request", this.info.id);
    }
  }
};
</script>
<style scoped>
.compact-leave-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(47, 65, 86, 0.1);
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e0e8ee;
}

/* Header Section */
.card-header {
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(to right, #f5efeb, #ffffff);
  border-bottom: 1px solid #d6e4f0;
  transition: all 0.2s ease;
}

.card-header:hover {
  background: linear-gradient(to right, #ede6e2, #f5efeb);
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
  background: linear-gradient(135deg, #567c8d, #2f4156);
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
  color: #2f4156;
}

.employee-info p {
  margin: 3px 0 0;
  font-size: 12px;
  color: #7a8fa1;
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
  background: linear-gradient(135deg, #fff3bf, #ffe69e);
  color: #b35900;
}

.badge.approved {
  background: linear-gradient(135deg, #d3f9d8, #b2f2bb);
  color: #1a5e2b;
}

.badge.denied {
  background: linear-gradient(135deg, #ffd3d3, #ffb8b8);
  color: #991b1b;
}

.toggle-icon {
  font-size: 13px;
  color: #567c8d;
  margin-left: 8px;
  transition: transform 0.2s;
}

/* Expanded Content */
.card-body {
  padding: 8px 16px;
  background-color: #ffffff;
}

.request-item {
  display: flex;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #f0f5f9;
  transition: background-color 0.2s;
}

.request-item:hover {
  background-color: #f8fafc;
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
  background-color: #f5f9fc;
  border-radius: 6px;
}

.request-date .day {
  font-size: 16px;
  font-weight: 600;
  color: #2f4156;
}

.request-date .month {
  font-size: 10px;
  text-transform: uppercase;
  color: #7a8fa1;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.request-details {
  flex-grow: 1;
}

.request-details .reason {
  margin: 0;
  font-size: 13px;
  color: #3a4d61;
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
  background: linear-gradient(135deg, #fff3bf, #ffe69e);
  color: #b35900;
}

.status.approved {
  background: linear-gradient(135deg, #d3f9d8, #b2f2bb);
  color: #1a5e2b;
}

.status.denied {
  background: linear-gradient(135deg, #ffd3d3, #ffb8b8);
  color: #991b1b;
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
  background: linear-gradient(135deg, #10b981, #0d9e6e);
  color: white;
}

.btn-approve:hover {
  background: linear-gradient(135deg, #0d9e6e, #10b981);
  transform: translateY(-1px);
}

.btn-deny {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.btn-deny:hover {
  background: linear-gradient(135deg, #dc2626, #ef4444);
  transform: translateY(-1px);
}

/* Animation for expanding */
.card-body {
  animation: fadeIn 0.3s ease-out;
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

/* Font Awesome Icons
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'); */
</style>
