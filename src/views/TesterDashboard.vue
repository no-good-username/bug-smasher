<template>
    <Navbar />
    <div class="mainTe">
        <div class="mainB">
            <h2>Report A Bug</h2>
            <form @submit.prevent="reportBug">
                <q-input class="bgc" v-model="bug.title" label="Title" filled required />
                <q-input class="bgc" v-model="bug.description" label="Description" type="textarea" filled required/>
                <q-select class="bgc" v-model="bug.priority" :options="priorities" label="Priority" filled required/>
                <button type="submit">Report</button>
            </form>
        </div>
    </div>
</template>

<script>
    import { useBugsStore } from '../bugStore';
    import Navbar from '../components/Navbar.vue';
    import { useRouter, useRoute } from 'vue-router';
    import { ref } from 'vue';  
    
    export default {
        setup(){
        const bugsStore = useBugsStore();
        const route = useRoute();

        const username = ref(route.params.username || '');


        
        console.log(username);
        const reportBug = () => {
        console.log(bug.value);
        bugsStore.addBug(bug.value);
        bug.value.title = '';
        bug.value.description = '';
        bug.value.priority = 'low';
        console.log(bugsStore.bugs);
    }
        const bug = ref({
        id: '5',
        title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        reportedBy: username,
        assignedTo: '',
        deadline: null,
        createdAt: null,
        updatedAt: null,
        });

        return { reportBug, bug }
    },
        data(){
            return{
                     priorities : ['high', 'medium', 'low']
        }
    },
        components: {
            Navbar,
        },
        methods:{
                
        }
    }
</script>

<style scoped>
h2 {
  color: white;
  font-size: x-large;
}

.mainTe {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
  margin: auto;
  padding: 10px;
  width: 90vw;
}

.mainB {
  width: 100%;
  height: auto;
  background-color: rgba(200, 172, 214, 0.75);
  border-radius: 10px;
  padding: 20px; /* Added padding for better form spacing */
}

.bgc{
    background: rgb(0,0,0,0.1);
    margin-bottom: 1rem;
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

form {
  color: white;
}

::v-deep .q-field__native,
::v-deep .q-field__label {
  color: white !important;
}

::v-deep .q-field--filled .q-field__control {
  background-color: transparent !important; /* Ensuring the background is transparent */
}

::v-deep .q-field__input {
  color: white !important;
}

::v-deep .q-input__inner {
  color: white !important;
}

::v-deep .q-field__label--filled {
  color: white !important;
}

::v-deep .q-field__control-container {
  color: white !important;
}
</style>
