<template>
  <div>
    <Navbar />
    <h1>Admin Dashboard</h1>
    
    <div class="main">
      <div class="pend top-left">
        <BugsListP />
      </div>
      <div class="assi top-right">
        <BugListA /> 
      </div>
        <div class="assi bottom">
        <BugListC />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import BugsListP from '../components/BugsListP.vue';
import BugListA from '../components/BugListA.vue';
import BugListC from '../components/BugListC.vue';

export default {
  components: {
    Navbar,
    BugsListP,
    BugListA,
    BugListC
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
  grid-column: 1 / 1; /* Start at column 1, end before column 2 */
  grid-row: 1; /* Top row */
    }
    .top-right {
      grid-column: 2 / 2; /* Start at column 2, end before column 3 */
      grid-row: 1; /* Top row */
    }
    .bottom {
      grid-column: 1 / 3; /* Span across both columns */
      grid-row: 2; /* Bottom row */
    }
.pend, .assi {
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
