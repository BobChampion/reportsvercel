<template>
  <div id="app">
    <div class="appInner">
      <NavBar />
      <div class="appContent">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: { NavBar },
  name: 'App',
};
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
}
.appInner {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.appContent {
  height: 88vh;
}
</style>
