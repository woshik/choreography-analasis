<template>
  <Base>
    <form class="login100-form validate-form p-l-55 p-r-55 p-t-178" @submit.prevent="submit">
      <span class="login100-form-title">Trainer's Registration</span>

      <div
        v-if="messageDisplay"
        class="alert"
        :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
        role="alert"
      >
        {{ messageDisplay }}
      </div>

      <div class="m-b-16">
        <input
          class="input100"
          type="text"
          name="full-name"
          placeholder="Full Name"
          autocomplete="off"
          v-model.trim="fullName"
        />
      </div>

      <div class="m-b-16">
        <date-picker
          v-model="dob"
          input-class="input100"
          format="DD-MM-YYYY"
          placeholder="Date of Birth"
        />
      </div>

      <div class="m-b-16">
        <input
          class="input100"
          type="text"
          name="username"
          placeholder="Username"
          autocomplete="off"
          v-model.trim="username"
        />
      </div>

      <div class="m-b-16">
        <input
          class="input100"
          type="password"
          name="pass"
          placeholder="Password"
          autocomplete="off"
          v-model.trim="password"
        />
      </div>

      <div class="m-b-16">
        <input
          class="input100"
          type="password"
          name="pass"
          placeholder="Confirm Password"
          autocomplete="off"
          v-model.trim="confirmPassword"
        />
      </div>

      <div class="container-login100-form-btn p-b-40">
        <button class="login100-form-btn">Sign Up</button>
      </div>

      <div class="flex-col-c p-t-50 p-b-40">
        <span class="txt1 p-b-9"> Already have an Accout? </span>

        <router-link :to="{ name: 'UserLogin' }" class="txt3">
          Back To Login
        </router-link>
      </div>
    </form>
  </Base>
</template>

<script>
import UserService from '@/services/trainer.service';
import FromValidation from '@/mixins/FormValidation';
import DatePicker from 'vue2-datepicker';
import Base from './Base.vue';

import 'vue2-datepicker/index.css';

export default {
  name: 'Registration',
  components: {
    DatePicker,
    Base,
  },
  mixins: [FromValidation],
  data() {
    return {
      fullName: '',
      dob: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  },
  formFields: ['fullName', 'dob', 'username', 'password', 'confirmPassword'],
  methods: {
    async submit() {
      try {
        await new UserService().add(this.formData);
        this.resetAll();
        this.showMessage({
          success: true,
          message: 'Registration Complete',
        });
        setTimeout(() => {
          this.$router.push({ name: 'UserLogin' });
        }, 2000);
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
  },
};
</script>

<style scoped>
a {
  font-family: Ubuntu-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
  color: #1b3815;
}

/*---------------------------------------------*/
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}

p {
  font-family: Ubuntu-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

ul,
li {
  margin: 0px;
  list-style-type: none;
}

/*---------------------------------------------*/
input {
  outline: none;
  border: none;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: none;
  -webkit-appearance: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

textarea {
  outline: none;
  border: none;
}

/*---------------------------------------------*/
button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
}

iframe {
  border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ Utility ]*/
.txt1 {
  font-family: Ubuntu-Regular;
  font-size: 15px;
  color: #999999;
  line-height: 1.4;
}

.txt2 {
  font-family: Ubuntu-Regular;
  font-size: 15px;
  color: #57b846;
  line-height: 1.4;
}

.txt3 {
  font-family: Ubuntu-Bold;
  font-size: 15px;
  color: #57b846;
  line-height: 1.4;
  text-transform: uppercase;
}

/* ------------------------------------ */
.p-b-9 {
  padding-bottom: 9px;
}
.p-b-23 {
  padding-bottom: 23px;
}
.p-b-40 {
  padding-bottom: 40px;
}

.p-t-13 {
  padding-top: 13px;
}
.p-t-50 {
  padding-top: 50px;
}
.p-t-178 {
  padding-top: 178px;
}

.p-l-55 {
  padding-left: 55px;
}

.p-r-55 {
  padding-right: 55px;
}

/* ------------------------------------ */
.m-b-16 {
  margin-bottom: 16px;
}

.flex-col-c {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
  -ms-align-items: center;
  align-items: center;
}

/* ------------------------------------ */
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-middle {
  vertical-align: middle;
}

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  position: relative;
  background-color: #fff;
}

.wrap-login100 {
  width: 500px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
}

.login100-form {
  width: 100%;
  position: relative;
}

.login100-form-title {
  font-family: JosefinSans-Bold;
  font-size: 30px;
  color: #fff;
  line-height: 1.2;
  text-align: center;

  display: block;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #57b846;
  padding-top: 50px;
  padding-bottom: 39px;
}

/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.login100-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
  background-color: #57b846;
  border-radius: 25px;

  font-family: Ubuntu-Bold;
  font-size: 15px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background-color: #1b3815;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}

/*//////////////////////////////////////////////////////////////////
[ Responsive ]*/
@media (max-width: 576px) {
  .login100-form {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>

<style>
.input100 {
  font-family: Ubuntu-Bold;
  font-size: 18px;
  color: #1b3815;
  line-height: 1.2;
  position: relative;
  display: block;
  width: 100%;
  height: 55px;
  background: #ebebeb;
  border-radius: 27px;
  padding: 0 35px 0 35px;
  outline: unset;
  border: unset;
}

.mx-datepicker {
  width: 100% !important;
}

.mx-icon-calendar,
.mx-icon-clear {
  right: 25px;
}

</style>
