<template>
  <trainer-login :user-service="TrainerService" />
</template>

<script>
import TrainerService from '@/services/trainer.service';
import TrainerLogin from '@/components/Authentication/Login.vue';

export default {
  name: 'Login',
  components: {
    TrainerLogin,
  },
  data() {
    return {
      TrainerService: new TrainerService(),
    };
  },
};
</script>
