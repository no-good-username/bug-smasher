<template>
    <div>
      <h1>Remaining Bugs</h1>
      <ul>
        <li v-for="bug in remainingBugs" :key="bug.id">
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
            <q-card-actions class="justify-center">
              <q-btn @click="() => markCompleted(bug.id)" label="Mark as Completed"  class="q-btn" flat />
            </q-card-actions>
          </q-card>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useBugsStore } from '../bugStore';
  import { QCard, QCardSection, QCardActions, QBtn } from 'quasar';
  import { useRoute } from 'vue-router';
  import { computed, watch } from 'vue';
  
  export default {
    name: 'RemainingBugsList',
    components: {
      QCard,
      QCardSection,
      QCardActions,
      QBtn
    },
    props: {
      markCompleted: {
        type: Function,
        required: true
      }
    },
    setup(props) {
      const bugsStore = useBugsStore();
      const route = useRoute();
  
      const username = computed(() => route.params.username);
  
      const remainingBugs = computed(() => {
        return bugsStore.bugsByDeveloper(username.value);
      });
  
      const formatDeadline = (deadline) => {
        if (!deadline) return 'No deadline';
        return new Date(deadline).toLocaleDateString();
      };
  
      watch(username, () => {
        remainingBugs.value = bugsStore.bugsByDeveloper(username.value);
      });
  
      return { remainingBugs, formatDeadline, markCompleted: props.markCompleted };
    }
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: xxx-large;
    color: white;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    list-style-type: none;
    padding: 0;
    justify-items: center;
    grid-gap: 1rem;
  }
  
  li {
    margin-bottom: 1rem;
  }
  .q-btn {
    border-radius: 10px;
    border: 1px rgb(255, 255, 255, 0.5) solid;
  }
  
  .my-card {
    width: 100%;
    max-width: 250px;
    border-radius: 10px;
  }
  .bg-brand {
    background: rgba(67, 61, 139, 0.55) !important;
  }

  .q-btn {
  border-radius: 10px;
  border: 1px rgb(255, 255, 255, 0.5) solid;
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
}

  </style>
  