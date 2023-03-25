<template>
  <div class="navBar">
    <router-link to="/" class="navbar-logo">
      <img src="../assets/img/logo.png" alt="" />
    </router-link>
    <div class="navBarInner">
      <router-link to="/reports" class="navBarLink">Adspect</router-link>
      <router-link to="/voluumn" class="navBarLink">Voluumn</router-link>
      <router-link to="/voluumn-error" class="navBarLink">Voluumn-Errors</router-link>
      <!-- <router-link to="" class="navBarLink">Errors</router-link> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.navBar {
  height: 12vh;
  background-color: #5161ce;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar-logo {
  padding: 5px;
}
.navbar-logo img {
  max-width: 100px;
}
.navBarInner {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
.navBarLink {
  display: block;
  font-family: 'Roboto';
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
}
.navBarLink.router-link-active {
  color: #fff;
  text-decoration: underline;
}
</style>
