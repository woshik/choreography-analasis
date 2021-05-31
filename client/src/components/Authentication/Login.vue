<template>
  <Base>
    <form class="login100-form validate-form p-l-55 p-r-55 p-t-178" @submit.prevent="submit">
      <span class="login100-form-title"> Welcome </span>

      <div
        v-if="messageDisplay"
        :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
        class="alert"
        role="alert"
      >
        {{ messageDisplay }}
      </div>

      <div class="wrap-input100 validate-input m-b-16">
        <input
          class="input100"
          type="text"
          name="username"
          placeholder="Username"
          autocomplete="off"
          v-model.trim="username"
        />
        <span class="focus-input100"></span>
      </div>

      <div class="wrap-input100 validate-input m-b-16">
        <input
          class="input100"
          type="password"
          name="password"
          placeholder="Password"
          autocomplete="off"
          v-model.trim="password"
        />
        <span class="focus-input100"></span>
      </div>

      <div class="container-login100-form-btn p-b-40">
        <button type="submit" class="login100-form-btn">Sign in</button>
      </div>

      <div v-if="haveRegistrationForm" class="flex-col-c p-t-70 p-b-40">
        <span class="txt1 p-b-9"> Don’t have an account? </span>
        <router-link :to="{ name: 'TrainerRegistration' }" class="txt3">
          Sign up now
        </router-link>
        <span class="txt1 p-t-13 p-b-13"> OR </span>
        <router-link :to="{ name: 'TraineeLogin' }" class="txt3">
          Login as a trainee
        </router-link>
      </div>
    </form>
  </Base>
</template>

<script>
import FromValidation from '@/mixins/FormValidation';
import Base from './Base.vue';

export default {
  name: 'Login',
  props: {
    haveRegistrationForm: {
      type: Boolean,
      default: true,
    },
    UserService: {
      type: Object,
      require: true,
    },
  },
  components: {
    Base,
  },
  mixins: [FromValidation],
  data() {
    return {
      username: '',
      password: '',
    };
  },
  formFields: ['username', 'password'],
  methods: {
    async submit() {
      try {
        const response = await this.UserService.login(this.formData);
        this.$store.dispatch('user/setUserData', response.userData);
        this.$store.dispatch('user/setAccessToken', response.token);
        this.$router.push({ name: 'Dashboard' });
      } catch (error) {
        this.showMessage(
          {
            message: error?.response?.data?.message ?? 'Something Wrong!!!',
          },
          5000,
        );
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

textarea:focus,
input:focus {
  border-color: transparent !important;
}

input::-webkit-input-placeholder {
  color: #1b3815;
}
input:-moz-placeholder {
  color: #1b3815;
}
input::-moz-placeholder {
  color: #1b3815;
}
input:-ms-input-placeholder {
  color: #1b3815;
}

textarea::-webkit-input-placeholder {
  color: #1b3815;
}
textarea:-moz-placeholder {
  color: #1b3815;
}
textarea::-moz-placeholder {
  color: #1b3815;
}
textarea:-ms-input-placeholder {
  color: #1b3815;
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

.p-b-13 {
  padding-bottom: 13px;
}

.p-t-70 {
  padding-top: 70px;
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

/*//////////////////////////////////////////////////////////////////
[ login ]*/

/*==================================================================
[ Form ]*/

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
[ Input ]*/

.wrap-input100 {
  width: 100%;
  background-color: #fff;
  border-radius: 27px;
  position: relative;
  z-index: 1;
}

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
}

/*------------------------------------------------------------------
[ Focus Input ]*/

.focus-input100 {
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  transform: translateX(-50%);
  border-radius: 31px;
  background-color: #ebebeb;
  pointer-events: none;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-input100 {
  width: calc(100% + 20px);
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

/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  z-index: 1000;
  max-width: 70%;
  background-color: #fff;
  border: 1px solid #c80000;
  border-radius: 14px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 10px;
  pointer-events: none;

  font-family: Ubuntu-Bold;
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f06a";
  font-family: FontAwesome;
  display: block;
  position: absolute;
  z-index: 1100;
  color: #c80000;
  font-size: 16px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 16px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
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
