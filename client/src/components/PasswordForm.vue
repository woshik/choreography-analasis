<template>
  <div class="outer-w3-agile col-xl mt-3">
    <h4 class="tittle-w3-agileits mb-4">Change Password</h4>
     <div
        v-if="messageDisplay"
        class="alert"
        :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
        role="alert"
      >
        {{ messageDisplay }}
      </div>
    <form @submit.prevent="formSubmit">
      <div class="form-group">
        <label for="exampleFormControlInput1">Current Password</label>
        <input type="password" v-model="currentPassword" class="form-control" />
      </div>

      <div class="form-group">
        <label for="exampleFormControlInput1">New Password</label>
        <input type="password" v-model="newPassword" class="form-control" />
      </div>

      <div class="form-group">
        <label for="exampleFormControlInput1">Confirm Password</label>
        <input type="password" v-model="confirmPassword" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Confirm</button>
    </form>
  </div>
</template>

<script>
import FromValidation from '@/mixins/FormValidation';

export default {
  name: 'PasswordForm',
  mixins: [FromValidation],
  props: {
    userService: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },
  formFields: ['currentPassword', 'newPassword', 'confirmPassword'],
  methods: {
    async formSubmit() {
      try {
        await this.userService.passwordUpdate(this.formData);
        this.resetAll();
        this.showMessage({
          success: true,
          message: 'Password successfully updated.',
        });
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
  },
};
</script>
