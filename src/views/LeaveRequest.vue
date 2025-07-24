<template>
    <navbar-comp />
    <addleaverequest-comp />
    <span>Pending Request : {{ pendingCount }} | </span>
    <span>Approved Request : {{ approvedCount }} | </span>
    <span>Denied Request : {{ deniedCount }}</span>
    <leaverequest-comp v-for="(employee, index) in $store.state.leave_request" :key="index" :info="employee" />
    <footer-comp />
</template>
<script>
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import LeaverequestComp from '@/components/LeaverequestComp.vue';
import AddleaverequestComp from '@/components/AddleaverequestComp.vue';
export default {
    components: {
        NavbarComp,
        LeaverequestComp,
        AddleaverequestComp,
        FooterComp
    },
    computed: {
        pendingCount() {
            return this.$store.state.leave_request.filter(req => req.status === 'Pending').length;
        },
        approvedCount() {
            return this.$store.state.leave_request.filter(req => req.status === 'Approved').length;
        },
        deniedCount() {
            return this.$store.state.leave_request.filter(req => req.status === 'Denied').length;
        }
    }
}
</script>
<style></style>