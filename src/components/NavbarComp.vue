<template>
    <nav class="navbar">
        <div class="logo-container">
            <img src="@/assets/modernTech.png" alt="Company Logo" class="logo" style="width: 180px; height: auto;">
            
        </div>
        <div class="nav-links">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            <router-link to="/employee" class="nav-link">Employees</router-link>
            <router-link to="/payroll" class="nav-link">Payroll</router-link>
            <router-link to="/attendance" class="nav-link">Attendance</router-link>
            <router-link to="/leaverequest" class="nav-link">Leave Requests</router-link>
            <router-link to="/performancereview" class="nav-link">Performance Review</router-link>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'Navbar'
}
</script>
<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: #0b2545;
    color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    height: 150px;
    position: sticky;
    top: 0;
    z-index: 100;
}
.logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.logo {
    height: 85px;
    width: auto;
    object-fit: contain;
    
}


.nav-links {
    display: flex;
    gap: 2rem;
}
.nav-link {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.3s ease;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
.nav-link:hover {
    color:  #8da9c4; 
}
.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #8da9c4;
    transition: width 0.3s ease;
}
.nav-link:hover::after {
    width: 100%;
}
.router-link-active {
    color: #ffffff;
}
.router-link-active::after {
    width: 100%;
}
/* Responsive design */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        height: auto;
        padding: 1rem;
        width:100%;
    }
    .nav-links {
        margin-top: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }
    .company-name {
        font-size: 1.2rem;
    }
}
@media (max-width: 425px) {
    .navbar {
        position: relative;
        flex-direction: column;
        height: auto;
        padding: 1rem;
        width:100%;
    }
    .nav-links {
        margin-top: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }
    .company-name {
        font-size: 1.2rem;
    }
}
</style>