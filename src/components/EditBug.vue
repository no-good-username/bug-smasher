<template>
    <q-dialog class="modal-overlay" :model-value="isOpen" @update:model-value="value => isOpen = value">
      <q-card class="q-card">
        <q-card-section>
          <div class="text-h6">Edit Bug</div>
        </q-card-section>
        
        <q-card-section>
          <q-input v-model="editedBug.title" label="Title" filled />
          <q-input v-model="editedBug.description" label="Description" type="textarea" filled />
          <q-select v-model="editedBug.priority" :options="priorities" label="Priority" filled />
          <q-input v-model="editedBug.assignedTo" label="Assigned To" filled />
          <q-input v-model="editedBug.deadline" label="Deadline" type="date" filled />
        </q-card-section>
        
        <q-separator />
  
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="closeDialog" />
          <q-btn label="Save" color="primary" @click="saveChanges" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  import { useBugsStore } from '../bugStore';
  import { ref, watch } from 'vue';
  
  export default {
    name: 'EditBug',
    props: {
      bug: Object,
      isOpen: Boolean
    },
    setup(props, { emit }) {
      const bugsStore = useBugsStore();
      const editedBug = ref({ ...props.bug });
  
      watch(() => props.bug, () => {
        editedBug.value = { ...props.bug };
      });
  
      const priorities = ['high', 'medium', 'low'];
  
      const closeDialog = () => {
        emit('update:isOpen', false);
      };
  
      const saveChanges = () => {
        bugsStore.updateBug(editedBug.value.id, editedBug.value);
        closeDialog();
      };
  
      return { editedBug, priorities, closeDialog, saveChanges };
    }
  };
  </script>
  
  <style scoped>
  .q-card {
    width: 100%;
    max-width: 500px;
    background-color: rgba(200, 172, 214) ;
    border-radius: 10px;
    color: white;
    padding: 20px;
  }
  
  .modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.7);
  }
  
  .q-card-section {
    color: black;
  }
  
    .q-input, .q-select {
      margin-bottom: 20px;
      color: white !important; 
    }

  ::v-deep .q-field__native, 
::v-deep .q-select__content,
::v-deep .q-input__inner {
  color: white !important; 
}
  

::v-deep .q-field__label,
::v-deep .q-select__label {
  color: white !important;
}
  .q-btn {
    border-radius: 8px;
    margin-left: 10px;
  }
  
  .q-btn.flat {
    color: white;
  }
  
  .q-btn[color="primary"] {
    background-color: #433D8B;
    color: white;
  }
  
  .q-card-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .text-h6 {
    font-size: 1.25rem;
    font-weight: bold;
  }
  </style>
  