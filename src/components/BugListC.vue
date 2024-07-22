<template>
    <div>
      <h1>Completed Bugs</h1>
      <ul>
        <li v-for="bug in completedbugs" :key="bug.id">
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
  import { useUserStore } from '../store';
  import { QCard, QCardSection, QCardActions, QBtn, QSeparator } from 'quasar';
  import { computed } from 'vue';
  
  export default {
    name: 'BugListA',
    components: {
      QCard,
      QCardSection,
      QCardActions,
      QBtn,
      QSeparator,
    },
    setup() {
      const bugsStore = useBugsStore();
      const userStore = useUserStore();
      const devList = userStore.devs;
  
      // Use computed properties to filter bugs
      const completedbugs = computed(() => bugsStore.completedBugs);
  
      const formatDeadline = (deadline) => {
        if (!deadline) return 'No deadline';
        return new Date(deadline).toLocaleDateString();
      };
  
  
      return { completedbugs, formatDeadline};
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: xxx-large;
    color: white;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    list-style-type: none;
    padding: 0;
    justify-items: center;
    align-items: center;
    grid-gap: 1rem;
  }
  
  li {
    margin-bottom: 1rem;
  }
  .q-btn{
    border-radius: 10px;
    border: 1px rgb(255,255,255,0.5) solid
  }
  
  select{
    margin: 1rem;
    background: rgba(67, 61, 139, 0.55);
    border-radius: 10px;
    color: white;
    border: none;
  }
  
  option{
    background: rgba(67, 61, 139, 0.55);
    border: none;
  }
  
  .my-card {
    width: 200%;
    max-width: 350px;
    border-radius: 10px;
  }
  .bg-brand {
    background: rgba(67, 61, 139, 0.55) !important;
  }

  @media(max-width: 768px) {
  ul{
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
  }
  li{
    justify-content: center
  }
  .my-card{
    width: 100%;
  }
  h1{
    font-size: x-large;
  }
}
  </style>
  