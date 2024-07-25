<template>
  <div>
    <Navbar />
    <h1>Admin Dashboard</h1>
    
    

    <div class="main">
      
      <div class="bttonList">
        <h2>Navigate to:</h2>
      <a v-ripple class="btton" href="#pending">Pending</a>
      <a v-ripple class="btton" href="#Un-Assigned">UnAssigned</a>
      <a v-ripple class="btton" href="#completed  ">Completed</a>
    </div>
      <div id="pending" class="pend top-left">
        <BugsListP />
      </div>
      <div id="Un-Assigned" class="assi top-right">
        <BugListA /> 
      </div>
        <div id="completed" class="assi bottom">
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
