<template>
    <div>
      <h1>Completed Bugs</h1>
      <ul>
        <li v-for="bug in completedBugs" :key="bug.id">
          <q-card class="my-card bg-brand text-white">
            <q-card-section>
              <div class="text-h6">{{ bug.title }}</div>
              <div class="text-subtitle2">Reported by: {{ bug.reportedBy }}</div>
            </q-card-section>
  
            <q-card-section>
              {{ bug.description }}
            </q-card-section>
            <q-card-section>
              Priority: {{ bug.priority }} <br>
              Assigned to: {{ bug.assignedTo || 'Unassigned' }}<br>
              Deadline: {{ formatDeadline(bug.deadline) }}<br>
            </q-card-section>
          </q-card>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useBugsStore } from '../bugStore';
  import { QCard, QCardSection } from 'quasar';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  
  export default {
    name: 'CompletedBugsList',
    components: {
      QCard,
      QCardSection
    },
    setup() {
      const bugsStore = useBugsStore();
      const route = useRoute();
      const username = computed(() => route.params.username);
      const completedBugs = computed(() => bugsStore.completedBugsByDeveloper(username.value));
  
      const formatDeadline = (deadline) => {
        if (!deadline) return 'No deadline';
        return new Date(deadline).toLocaleDateString();
      };

      
  
      return { completedBugs, formatDeadline };
    },
  };
  </script>
  
  <style scoped>
  h1 {
  font-size: xxx-large;
  color: white;
  text-align: center; /* Center the heading */
}
ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two equal-width columns */
  list-style-type: none;
  padding: 0;
  grid-gap: 1rem;
  justify-content: center; /* Center the grid */
}

li {
  display: flex;
  justify-content: center; /* Center the card within the li */
  margin-bottom: 1rem;
}

.my-card {
  width: 100%; /* Make sure the card takes the full width of the column */
  max-width: 300px; /* Optional: to prevent the card from being too wide */
  border-radius: 10px;
  justify-items: center;
}
.bg-brand {
  background: rgba(67, 61, 139, 0.55) !important;
}

  </style>
  