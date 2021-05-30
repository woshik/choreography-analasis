<template>
  <component :is="dynamicLoad" />
</template>

<script>
import { mapGetters } from 'vuex';
import TrainerDashboard from '@/views/trainer/Dashboard.vue';
import TraineeDashboard from '@/views/trainee/Dashboard.vue';

export default {
  name: 'Dashboard',
  computed: {
    dynamicLoad() {
      return this.isTrainer ? TrainerDashboard : TraineeDashboard;
    },
    ...mapGetters('user', ['isTrainer']),
  },
};
</script>
