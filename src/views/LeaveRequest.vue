<template>
    <navbar-comp />
    <div class="top-bar animate__animated animate__backInLeft">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search employee or leave"
            class="search-input"
        />
        <addleaverequest-comp />
    </div>
    <div class="compact-leave-card animate__animated animate__backInUp">
      <div class="card-header">
        <span class="badge">Pending Request : {{ $store.getters.pendingLeaveRequests }} </span>
        <span class="badge">Approved Request : {{ $store.getters.approvedLeaveRequests }} </span>
        <span class="badge">Denied Request : {{ $store.getters.deniedLeaveRequests }}</span>
      </div>
      <leaverequest-comp v-for="leave_request in filteredLeaveRequest" :key="leave_request.id" :info="leave_request" />
    </div>
    
    <footer-comp />
</template>
<script>
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import LeaverequestComp from '@/components/LeaverequestComp.vue';
import AddleaverequestComp from '@/components/AddleaverequestComp.vue';
export default {
    data(){
      return {
        searchQuery: "",
      }
    },
    components: {
        NavbarComp,
        LeaverequestComp,
        AddleaverequestComp,
        FooterComp
        
    },
    computed: {
        filteredLeaveRequest() {
            const query = this.searchQuery.toLowerCase();
            return this.$store.state.leave_request.filter(employee => employee.name.toLowerCase().includes(query));
        }
    }
}
</script>
<style>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Button aligned left by default inside .top-bar */
.search-input {
  flex: 1;
  min-width: 200px;
  padding: 0.6rem 1rem;
  border: 1px solid #c8d9e6;
  border-radius: 6px;
  font-size: 1rem;
  color: #2f4156;
}

.badge {
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.compact-leave-card {
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(47, 65, 86, 0.1);
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #E0E8EE;
}

.card-header {
  padding: 14px 16px;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(to right, #F5EFEB, #FFFFFF);
  border-bottom: 1px solid #D6E4F0;
  transition: all 0.2s ease;
  height: 30px;
}
</style>