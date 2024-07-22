import { defineStore } from 'pinia';

const sampleBug = {
  id: '',
  title: '',
  description: '',
  status: 'pending', // 'pending', 'completed'
  priority: 'low', // 'low', 'medium', 'high'
  reportedBy: '', // tester's ID
  assignedTo: '', // developer's ID
  deadline: null, // timestamp
  createdAt: null, // timestamp
  updatedAt: null, // timestamp
};

export const useBugsStore = defineStore('bugsStore', {
  state: () => ({
    bugs: [
      {
        id: '1',
        title: 'Login issue',
        description: 'Unable to login with valid credentials.',
        status: 'pending',
        priority: 'low',
        reportedBy: 'tester123',
        assignedTo: '',
        deadline: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Some issue',
        description: 'Unable to login with valid credentials.',
        status: 'pending',
        priority: 'high',
        reportedBy: 'tester123',
        assignedTo: 'dev1',
        deadline: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Some issue',
        description: 'Unable to login with valid credentials.',
        status: 'pending',
        priority: 'medium',
        reportedBy: 'tester123',
        assignedTo: 'dev1',
        deadline: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Some issue',
        description: 'Unable to login with valid credentials.',
        status: 'completed',
        priority: 'medium',
        reportedBy: 'tester123',
        assignedTo: 'dev2',
        deadline: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
  }),

  getters: {
    getBugById: (state) => (id) => state.bugs.find((bug) => bug.id === id),
    pendingBugs: (state) => state.bugs.filter((bug) => bug.status === 'pending' && bug.assignedTo !== ''),
    unAssignedBugs: (state) => state.bugs.filter((bug) => bug.assignedTo === ''),
    completedBugs: (state) => state.bugs.filter((bug) => bug.status === 'completed'),
    bugsByPriority: (state) => (priority) => state.bugs.filter((bug) => bug.priority === priority),
    bugsByDeveloper: (state) => (developerUsername) => state.bugs.filter(bug => bug.assignedTo === developerUsername && bug.status !== 'completed'),
    bugsByTester: (state) => (testerId) => state.bugs.filter((bug) => bug.reportedBy === testerId),
    completedBugsByDeveloper: (state) => (developerUsername) => state.bugs.filter(bug => bug.assignedTo === developerUsername && bug.status === 'completed'),
  },

  actions: {
    addBug(bug) {
      const newBug = {
        ...sampleBug,
        ...bug,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.bugs.push(newBug);
      this.updateLists();
    },
    updateBug(bugId, updatedFields) {
      const index = this.bugs.findIndex((bug) => bug.id === bugId);
      if (index !== -1) {
        this.bugs[index] = {
          ...this.bugs[index],
          ...updatedFields,
          updatedAt: new Date().toISOString(),
        };
        this.updateLists();
      }
    },
    assignBug(bugId, assignedTo) {
      const bug = this.bugs.find(bug => bug.id === bugId);
      if (bug) {
        bug.assignedTo = assignedTo;
      }
    },
    updateBugStatus(bugId, status) {
      this.updateBug(bugId, { status });
    },
    filterBugs(filterFn) {
      return this.bugs.filter(filterFn);
    },
    updateLists() {
      this.$patch((state) => ({
        bugs: [...state.bugs],
      }));
    },
    deleteBug(bugId) {
      this.bugs = this.bugs.filter(bug => bug.id !== bugId);
      this.updateLists();
    },
    markBugCompleted(bugId) {
      const bug = this.bugs.find(bug => bug.id === bugId);
      if (bug) {
        bug.status = 'completed';
        this.updateBug(bugId, { status: 'completed' });
      }
    },
  },
});
