<template>
    <navbar-comp />
    <div class="top-bar">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search employee or leave"
            class="search-input"
        />
        <addleaverequest-comp />
    </div>
    <span>Pending Request : {{ $store.getters.pendingLeaveRequests }} | </span>
    <span>Approved Request : {{ $store.getters.approvedLeaveRequests }} | </span>
    <span>Denied Request : {{ $store.getters.deniedLeaveRequests }}</span>
    <leaverequest-comp v-for="leave_request in filteredLeaveRequest" :key="leave_request.id" :info="leave_request" />
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
</style>