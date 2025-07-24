<template>
  <router-view/>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch("fetch_employee_info")
      this.$store.dispatch("fetch_payroll_info")
      this.$store.dispatch("fetch_attendance_info")
      this.$store.dispatch("fetch_leave_request_info")
      // this.$store.dispatch('fetch_attendance'),
      // this.$store.dispatch('fetch_payroll_data')
      // this.$store.commit('update_to_leave_requests')
    }
  }
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #ff2200;
}

</style>
