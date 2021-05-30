<template>
  <router-view :key="routeKey" />
</template>

<script>
export default {
  name: 'App',
  computed: {
    routeKey() {
      return this.$route.path;
    },
  },
};
</script>
