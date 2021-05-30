<template>
  <div class="wrapper">
    <side-bar />

    <div class="content">
      <nav-bar />
      <div class="container-fluid">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';

import '@/assets/css/style.css';

export default {
  name: 'Dashboard',
  components: {
    NavBar,
    SideBar,
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: stretch;
}

.content {
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
  overflow: hidden;
  width: 100%;
}
</style>
