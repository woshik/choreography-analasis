<template>
  <nav class="navbar navbar-default mb-xl-5 mb-4">
    <div class="container-fluid">
      <div class="navbar-header"></div>

      <ul class="top-icons-agileits-w3layouts float-right">
        <li class="nav-item dropdown" :class="{ open: dropDownOpen }">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown2"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            @click="manageDropdown"
          >
            <font-awesome-icon icon="user" />
          </a>
          <div class="dropdown-menu drop-3" :style="{ display: dropDownOpen ? 'block' : 'none' }">
            <div class="profile d-flex mr-o">
              <div class="profile-r align-self-center">
                <h3 class="sub-title-w3-agileits">
                  {{ this.getUserFullName }}
                </h3>
                <a href="#">{{ this.getUsername }}</a>
              </div>
            </div>

            <div class="dropdown-divider"></div>
            <router-link
              v-if="isTrainer"
              :to="{ name: isTrainer ? 'TrainerProfile' : 'TraineeProfile' }"
              class="dropdown-item"
            >
              Profile
            </router-link>
            <span @click="logout" class="dropdown-item cp"> Logout </span>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      dropDownOpen: false,
    };
  },
  computed: {
    ...mapGetters('user', ['getUserFullName', 'getUsername', 'isTrainer']),
  },
  methods: {
    manageDropdown() {
      this.dropDownOpen = !this.dropDownOpen;
    },
    logout() {
      const { isTrainer } = this;
      this.$store.dispatch('user/logoutUser');
      this.$router.push({ name: isTrainer ? 'TrainerLogin' : 'TraineeLogin' });
    },
  },
};
</script>

<style scoped>
.navbar {
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
  background: #4463dc;
}

.btn-info:focus,
.btn-info.focus {
  box-shadow: 0 0 0 0.2rem rgb(151, 170, 247);
}

.btn-info:not(:disabled):not(.disabled):active,
.btn-info:not(:disabled):not(.disabled).active,
.show > .btn-info.dropdown-toggle,
.btn-info:hover {
  color: #fff;
  background-color: #e04646;
  border-color: #f75757;
}
</style>
