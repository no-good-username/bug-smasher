<template>
  <div>
    <h1>UnAssigned Bugs</h1>
    <ul>
      <li v-for="bug in unAssignedBugs" :key="bug.id">
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

          <q-separator dark />

          <q-card-actions class="justify-center">
            <select v-model="bug.selectedDeveloper">
              <option value="">Unassigned</option>
              <option v-for="dev in devList" :key="dev.userId" :value="dev">{{ dev.username }}</option>
            </select>
            <q-btn class="q-btn" outline flat rounded @click="assignBug(bug)">Assign</q-btn>
          </q-card-actions>
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
    const unAssignedBugs = computed(() => bugsStore.unAssignedBugs.filter(bug => !bug.assignedTo));

    const formatDeadline = (deadline) => {
      if (!deadline) return 'No deadline';
      return new Date(deadline).toLocaleDateString();
    };

    const assignBug = (bug) => {
      if (bug.selectedDeveloper) {
        bugsStore.assignBug(bug.id, bug.selectedDeveloper.username); // Call store action to assign bug
        bug.assignedTo = bug.selectedDeveloper.username; // Update local bug assignedTo
        bug.selectedDeveloper = null; // Reset selected developer after assignment
      } else {
        bugsStore.assignBug(bug.id, ''); // Assign bug as unassigned
        bug.assignedTo = ''; // Update local bug assignedTo
      }
      console.log(bugsStore.pendingBugs);
    };

    return { unAssignedBugs, formatDeadline, devList, assignBug };
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
  grid-template-columns: 1fr;
  list-style-type: none;
  padding: 0;
  justify-items: center;
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
  width: 100%;
  max-width: 250px;
  border-radius: 10px;
}
.bg-brand {
  background: rgba(67, 61, 139, 0.55) !important;
}

@media (max-width: 768px) {
  ul{
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
  }
  li{
    justify-content: center
  }
  h1{
    font-size: x-large;
  }
}
</style>
