<template>
  <Modal :isVisible="isModalVisible" @close="redirectUser">
    <h1>Welcome, {{ username }}!</h1>
  </Modal>
  <div class="login-container">
    <form class="login-box" @submit.prevent="handleLogin">
      <h1>Login</h1>
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" autocomplete="off" />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" />
      </div>
      <div class="checkbox-group">
        <input type="checkbox" id="show-password" v-model="showPassword" />
        <label for="show-password">Show Password</label>
      </div>
      <button type="submit">Login</button>
    </form>
    <div class="image-box">
      <img src="../assets/bug-tester.png" alt="Login illustration" />
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../store';
import Modal from '../components/Modal.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    Modal
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      userDesignation: '',
      isModalVisible: false,
    };
  },
  methods: {
    handleLogin() {
      const userStore = useUserStore();
      const user = userStore.getUser(this.username, this.password);
      if (user) {
        if (user.designation === 'admin' || user.designation === 'Tester' || user.designation === 'Dev') {
          this.userDesignation = user.designation;
          this.isModalVisible = true;
        } else {
          alert('Invalid username or password');
          this.resetForm();
        }
      } else {
        alert('Invalid username or password');
        this.resetForm();
      }
    },
    redirectUser() {
      this.isModalVisible = false;
      const routeMap = {
        admin: 'AdminDashboard',
        Tester: 'TesterDashboard',
        Dev: 'DevDashboard'
      };
      const routeName = routeMap[this.userDesignation];
      if (routeName) {
        this.router.push({ name: routeName, params: { username: this.username } });
      }
    },
    resetForm() {
      this.username = '';
      this.password = '';
      this.userDesignation = '';
    }
  }
};
</script>

<style scoped>
body{
  background-color: #121330; 
} 
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 5rem;
  height: auto;
  width: 55%;
  padding-right: 2.5%;
  background-color: #433D8B; 
  border-radius: 10px;
}

.login-box {
 
  background-color: rgba(200, 172, 214, 0.75); /* Light purple background color */
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-right: 50px;
}

h1 {
  margin-bottom: 20px;
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: lighter;
}

.input-group {
  margin-bottom: 15px;
  margin-top: 10%;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #ffffff;
  padding: 10px;
  color: #17153B;
}

input[type="text"],
input[type="password"] {
  background-color: #433D8B;
  color:white;
  width: 90%;
  padding: 8px;
  border-radius: 2.5rem;
  padding: 1rem;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.checkbox-group {
  display: flex;
  flex-direction: row;
  text-align: center;
  margin-bottom: 20px;
  color: white;
  /* background-color: red;   */
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 2.5rem;
  background-color: #433D8B; /* Dark blue button color */
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #17153B; /* Slightly darker blue on hover */
}

.image-box img {
  width: 400px;
  height: auto;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    width: 90%;
    padding: 2.5%;
  }

  .login-box {
    margin-right: 0;
    width: 100%;
  }

  .image-box {
    margin-top: 20px;
    width: 100%;
  }

  .image-box img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

  h1 {
    font-size: 2rem;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
  }
}
</style>
