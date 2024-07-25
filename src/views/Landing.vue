<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="landing-page">
        <div class="content">
          <h1>BUG SMASHER</h1>
          <q-btn @click="$router.push('/Login')" label="LOGIN" color="white" class="login-btn text-black" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
.landing-page {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10%;
  height: 100vh;
  background: linear-gradient(135deg, #2b1330, #1a1a2e);
  background-image: url('../assets/landingbg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.content {
  font-weight: bolder;
  text-align: left;
  color: white;
}

h1 {
  font-size: 6rem;
  margin-bottom: 2rem;
}

.login-btn {
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 10px;
}

@media (max-width: 768px) {

  h1{
    font-size: 4rem;
  }
}

</style>
