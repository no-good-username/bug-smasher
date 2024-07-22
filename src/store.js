import { createPinia, defineStore } from 'pinia';

const pinia = createPinia();

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [
      { username: 'admin', fullname: 'Admin User', email: 'admin@example.com', phone: '1234567890', designation: 'admin', password: '123' },
      { username: 'test', fullname: 'User One', email: 'user1@example.com', phone: '1234567891', designation: 'Tester', userId: 1, password: '1234' },
      { username: 'dev1', fullname: 'Dev One', email: 'dev1@example.com', phone: '1234567891', designation: 'Dev', userId: 100, password: '1234' },
      { username: 'dev2', fullname: 'Dev Two', email: 'dev2@example.com', phone: '1234567891', designation: 'Dev', userId: 101, password: '1234' }
    ]
  }),
  getters: {
    devs: (state) => state.users.filter(user => user.designation === 'Dev')
  },
  actions: {
    addUser(user) {
      this.users.push(user);
    },
    getUser(username, password) {
      const user = this.users.find(user => user.username === username && user.password === password);
      return user;
    },
    getUserByUsername(username) {
      const user = this.users.find(user => user.username === username);
      return user;
    }
  }
});

export default pinia;
