<template>
  <div class="logo-container">
    <div class="main-wrapper">
      <!-- Logo Side -->
      <div class="side-logo">
        <img src="@/assets/modernTech.png" alt="logo" class="main-logo" />
      </div>
      <!-- Form Side -->
      <div class="wrapper animate">
        <form @submit.prevent="handleLogin">
          <div class="form-header">
            <h1>Welcome To ModernTech Solutions</h1>
          </div>
          <div class="container">
            <label for="uname"><b>Username:</b></label>
            <input type="text" placeholder="Enter Username" name="uname" v-model="username" required />
            <label for="psw"><b>Password:</b></label>
            <input type="password" placeholder="Enter Password" name="psw" v-model="password" required />
            <button type="submit" class="loginbtn">Login</button><br />
            <h4>ModernTech / Solutions</h4>
            <label>
              <input type="checkbox" checked="checked" name="remember" /> Remember me </label>
          </div>
          <div class="container bottom-container">
            <button type="button" class="cancelbtn">Cancel</button>
            <span class="psw">Forgot <a href="#">password?</a></span>
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
      username: '',
      password: '',
      remember: true,
      error: ''
    };
  },
  methods: {
    handleLogin() {
      // Set your required credentials here
      const requiredUsername = 'ModernTech';
      const requiredPassword = 'Solutions';

      if (this.username === requiredUsername && this.password === requiredPassword) {
        // Successful login: redirect or emit event
        this.error = '';
        // Example: this.$router.push('/dashboard');
        window.location.href = '/dashboard';
      } else {
        this.error = 'Incorrect username or password.';
      }
    },
    resetForm() {
      this.username = '';
      this.password = '';
      this.error = '';
    }
  }
};
</script>
<style scoped>
.logo-container {
  background-image: url(https://media.istockphoto.com/id/984453214/photo/baby-blue-hand-painted-backdrop.jpg?s=612x612&w=0&k=20&c=DaDL638BRZulVu9uibPGQlEPbB-6COqmXoEw44va8Nc=);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-wrapper {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  width: 800px;
  max-width: 95%;
  animation: slideFadeIn 1s ease forwards;
}

.side-logo {
  background-color: #0b2545;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 50%;
}
.main-logo {
  width: 100%;
  max-width: 250px;
  animation: bounceFadeIn 1.2s ease-in-out;
}
/* Form Side */
.wrapper {
  width: 50%;
  padding: 30px;
  background-color: #ffffff;
}
.form-header {
  text-align: center;
  margin-bottom: 20px;
}
h1 {
  font-size: 22px;
  color: #0b2545;
}
form {
  padding: 0;
}
.container {
  padding: 0;
}
input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #0b2545;
  border-radius: 6px;
  box-sizing: border-box;
  transition: 0.3s;
}
input[type='text']:focus,
input[type='password']:focus {
  border-color: #8da9c4;
  outline: none;
}
button.loginbtn {
  background: linear-gradient(135deg, #0b2545, #8da9c4);
  color: #ffffff;
  padding: 12px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: 0.3s;
}
button.loginbtn:hover {
  background: linear-gradient(135deg, #8da9c4, #0b2545);
  transform: scale(1.02);
}
.cancelbtn {
  padding: 10px 20px;
  background-color: #e61a1a;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}
.cancelbtn:hover {
  background-color: #b71c1c;
}
input[type='checkbox'] {
  accent-color: #319227;
}
.bottom-container {
  background-color: #0b2545;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  margin-top: 20px;
  color: white;
}
span.psw a {
  color: white;
  text-decoration: underline;
}
@keyframes slideFadeIn {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes bounceFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-30px);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) translateY(10px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}
/* Responsive Layout */
@media screen and (max-width: 768px) {
  .main-wrapper {
    flex-direction: column;
  }
  .wrapper,
  .side-logo {
    width: 100%;
  }
  .side-logo {
    padding: 20px;
  }
  .main-logo {
    max-width: 180px;
  }
}
</style>