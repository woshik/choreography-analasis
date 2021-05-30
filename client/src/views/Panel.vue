<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import Layout from '@/components/Dashboard/Layout.vue';

export default {
  name: 'Dashboard',
  components: {
    Layout,
  },
};
</script>
