<template>
    <div>
      <Navbar />
      <h1>Developer Dashboard</h1>
  
      <div class="main">
        <div class="bttonList">
        <h2>Navigate to:</h2>
      <a v-ripple class="btton" href="#remaining">Remaining</a>
      <a v-ripple class="btton" href="#completed">Completed</a>
    </div>
        <div id="remaining" class="remaining top-left">
          <RemainingBugsList :markCompleted="markBugCompleted" />
        </div>
        <div id="completed" class="completed top-right">
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
  .bttnList {
  display: none;
}

.btton{display: none;}

h2{
  display: none;
}

  @media (max-width: 768px){
  .main {
  display: flex;
  flex-direction: column;
}
h2{
    display: inline;
    color: white;
    font-size: xx-large;
  }

  .bttonList {
    display:flex;
    height: 150%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(200, 172, 214, 0.75);

    padding: 12%;
    border-radius: 10px;
  }

  .btton {
  display: inline;
  margin: 10px;
  text-decoration: none ;
  border: none;
  outline: none;
  background-color: rgba(67, 61, 139, 0.55);
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border-radius: 5px;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px rgba(67, 61, 139, 0.75);
}

  .btton:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px rgba(67, 61, 139, 0.75);
  }

}
  </style>
  