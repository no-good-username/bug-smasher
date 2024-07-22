<template>
  <div class="navbar">
    <div class="user-info">
      <img src="../assets/bug-tester.png" alt="User Icon" class="user-icon" />
      <div  class="maindisp">
        <div>{{ username }}</div>
        <div>{{ userRole }}</div>
      </div>
      <h5>BUG&nbsp;SMASHER</h5>
    </div>

    <div class="nav-buttons">
      <q-btn flat label="Login" @click="navigateTo('Login')" />
      <q-btn flat label="Dashboard" @click="navigateToDashboard" />
    </div>
    <div class="menu-icon" @click="toggleDropdown">
      ☰
    </div>
    <div v-if="isDropdownVisible" class="dropdown-menu">
      <q-btn class="text-white" flat label="Login" @click="navigateTo('Login')" />
      <q-btn class="text-white" flat label="Dashboard" @click="navigateToDashboard" />
    </div>
  </div>
</template>


<script>
import { useUserStore } from '../store';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';

export default {
  setup() {
    const userStore = useUserStore();
    const route = useRoute();
    const router = useRouter();

    const username = ref(route.params.username || '');
    const userRole = ref('');
    const isDropdownVisible = ref(false);

    const fetchUserRole = () => {
      const user = userStore.getUserByUsername(username.value);
      if (user) {
        userRole.value = user.designation;
      }
    };

    const navigateTo = (routeName) => {
      router.push({ name: routeName });
      isDropdownVisible.value = false; // Close the dropdown after navigating
    };

    const navigateToDashboard = () => {
      const roleRouteMap = {
        admin: 'AdminDashboard',
        Tester: 'TesterDashboard',
        Dev: 'DevDashboard',
      };
      const routeName = roleRouteMap[userRole.value] || 'Login';
      router.push({ name: routeName });
      isDropdownVisible.value = false; // Close the dropdown after navigating
    };

    const toggleDropdown = () => {
      isDropdownVisible.value = !isDropdownVisible.value;
    };

    onMounted(() => {
      username.value = userStore.username || route.params.username; // Fallback to route params if store username is not set
      if (username.value) {
        fetchUserRole();
      }
    });

    // Watch for changes in username
    watch(() => username.value, (newUsername) => {
      if (newUsername) {
        fetchUserRole();
      }
    });

    return {
      username,
      userRole,
      isDropdownVisible,
      navigateTo,
      navigateToDashboard,
      toggleDropdown
    };
  }
};
</script>


<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  color: white;
  background-color: #433D8B;
  border-radius: 0 0 10px 10px;
  margin-top: 0;
  width: 90%;
  margin: auto;
}


h5 {
  font-family: monospace;
  text-align: center;
  color: black;
  font-size: x-large;
  margin: 0;
  margin-left: 220%;
  width: 100%;
  background: white;
  padding: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
}

.user-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.nav-buttons {
  display: flex;
  gap: 10px;
}

.menu-icon {
  display: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
}

.dropdown-menu {
  display: none;
  flex-direction: column;
  gap: 10px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  .user-info {
    margin-bottom: 10px;
  }

  h5 {
    margin-left: 7rem;
    font-size: large;
    padding: 5px;
  }

  .nav-buttons {
    display: none;
  }

  .menu-icon {
    display: block;
  }

  .dropdown-menu {
    display: flex;
    width: 100%;
  }
}
</style>
