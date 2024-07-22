<template>
    <div>
      <Navbar />
      <h1>Developer Dashboard</h1>
  
      <div class="main">
        <div class="remaining top-left">
          <RemainingBugsList :markCompleted="markBugCompleted" />
        </div>
        <div class="completed top-right">
          <CompletedBugsList />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import RemainingBugsList from '../components/RemainingBugsList.vue';
  import CompletedBugsList from '../components/CompletedBugsList.vue';
  import { useBugsStore } from '../bugStore';
  
  export default {
    components: {
      Navbar,
      RemainingBugsList,
      CompletedBugsList
    },
    setup() {
      const bugsStore = useBugsStore();
  
      const markBugCompleted = (bugId) => {
        bugsStore.markBugCompleted(bugId);
      };
  
      return { markBugCompleted };
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: white;
    font-size: x-large;
  }
  .main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-gap: 2rem;
    align-items: top;
    justify-content: space-between;
    margin: auto;
    padding: 10px;
    width: 90vw;
  }
  .top-left {
    grid-column: 1 / 2;
    grid-row: 1;
  }
  .top-right {
    grid-column: 2 / 3;
    grid-row: 1;
  }
  .remaining, .completed {
    width: 100%;
    height: auto;
    background-color: rgba(200, 172, 214, 0.75);
    border-radius: 10px;
  }

  @media (max-width: 768px){
  .main {
  display: flex;
  flex-direction: column;
}
}
  </style>
  