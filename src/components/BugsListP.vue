<template>
  <div>
    <EditBug v-if="selectedBug" :bug="selectedBug" :isOpen="isEditDialogOpen" @update:isOpen="isEditDialogOpen = $event" />
    <h1>Pending Bugs</h1>
    
    <ul v-if="sortedPendingBugs.length > 0">
      <li v-for="bug in sortedPendingBugs" :key="bug.id">
        <q-card class="my-card bg-brand text-white">
          <q-card-section>
            <div class="text-h6">{{ bug.title }}</div>
            <div class="text-subtitle2">Reported by: {{ bug.reportedBy }}</div>
          </q-card-section>

          <q-card-section>
            {{ bug.description || 'No description provided' }}
          </q-card-section>

          <q-card-section>
            Priority: {{ bug.priority || 'Unknown' }} <br>
            Assigned to: {{ bug.assignedTo || 'Unassigned' }}<br>
            Deadline: {{ formatDeadline(bug.deadline) || 'No deadline' }}<br>
          </q-card-section>

          <q-separator dark />

          <q-card-actions class="justify-center">
            <q-btn class="q-btn" flat @click="deleteBug(bug)">Delete</q-btn>
            <q-btn class="q-btn" flat @click="openEditDialog(bug)">Edit</q-btn>
          </q-card-actions>
        </q-card>
      </li>
    </ul>
    <div v-else>
      <h2>No pending bugs</h2>
    </div>
  </div>
</template>

<script>
import { useBugsStore } from '../bugStore';
import { QCard, QCardSection, QCardActions, QBtn, QSeparator } from 'quasar';
import { computed, ref } from 'vue';
import EditBug from './EditBug.vue';

export default {
  name: 'BugsList',
  
  components: {
    QCard,
    QCardSection,
    QCardActions,
    QBtn,
    QSeparator,
    EditBug
  },
  setup() {
    const bugsStore = useBugsStore();
    const pendingBugs = computed(() => bugsStore.pendingBugs);
    const selectedBug = ref(null);
    const isEditDialogOpen = ref(false);

    const formatDeadline = (deadline) => {
      if (!deadline) return 'No deadline';
      return new Date(deadline).toLocaleDateString();
    };

    const sortedPendingBugs = computed(() => {
      return pendingBugs.value.slice().sort((a, b) => {
        return priorityValue(b.priority) - priorityValue(a.priority);
      });
    });

    const priorityValue = (priority) => {
      switch (priority) {
        case 'high':
          return 3;
        case 'medium':
          return 2;
        case 'low':
          return 1;
        default:
          return 0;
      }
    };

    const openEditDialog = (bug) => {
      if (bug) {
        selectedBug.value = bug;
        isEditDialogOpen.value = true;
      }
    };

    

    return { pendingBugs, sortedPendingBugs, formatDeadline, openEditDialog, selectedBug, isEditDialogOpen };
  },methods:{
    deleteBug(bug){
      const bugsStore = useBugsStore();
      bugsStore.deleteBug(bug.id);
    }
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
  grid-template-columns: 1fr 1fr;
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

@media(max-width: 768px) {
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

