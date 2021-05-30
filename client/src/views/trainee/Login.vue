<template>
  <trainer-login :have-registration-form="false" :user-service="TraineeService" />
</template>

<script>
import TraineeService from '@/services/trainee.service';
import TrainerLogin from '@/components/Authentication/Login.vue';

export default {
  name: 'Login',
  components: {
    TrainerLogin,
  },
  data() {
    return {
      TraineeService: new TraineeService(),
    };
  },
};
</script>
