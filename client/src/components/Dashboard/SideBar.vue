<template>
  <nav class="sidebar">
    <div class="sidebar-header">
      <h1 style="text-align: center">
        <router-link :to="{ name: 'Dashboard' }">
          {{ isTrainer ? "Trainer" : "Trainee" }}
        </router-link>
      </h1>
      <span style="text-align: center">
        <router-link :to="{ name: 'Dashboard' }">
          {{ isTrainer ? "T" : "T" }}
        </router-link>
      </span>
    </div>

    <ul class="list-unstyled components">
      <li v-for="item in getMenu" :key="item.id" :class="{active: getActiveMenu(item.routeName)}">
        <router-link :to="{ name: item.routeName }">
          <font-awesome-icon :icon="item.icon" />
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { trainerMenu, traineeMenu } from '@/assets/static';

export default {
  name: 'SideBar',
  data() {
    return {
      trainerMenu,
      traineeMenu,
    };
  },
  methods: {
    getActiveMenu(name) {
      return name === this.$route.meta.active;
    },
  },
  computed: {
    getMenu() {
      return this.isTrainer ? this.trainerMenu : this.traineeMenu;
    },
    ...mapGetters('user', ['isTrainer']),
  },
};
</script>

<style scoped>
.sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #4c6ef5;
  color: #fff;
  transition: all 0.3s;
}

.sidebar-header h1 {
  font-size: 2.3em;
  letter-spacing: 3px;
  color: #fff;
  text-shadow: 2px 2px 3px #39393a;
}

.sidebar.active {
  min-width: 110px;
  max-width: 100px;
  text-align: center;
}

.sidebar.active .sidebar-header h1,
.sidebar.active .CTAs {
  display: none;
}

.sidebar.active .sidebar-header span {
  display: block;
}

.sidebar.active ul li a {
  padding: 20px 10px;
  text-align: center;
  font-size: 0.85em;
}

.sidebar.active ul li a i {
  margin-right: 0;
  display: block;
  font-size: 1.2em;
  margin-bottom: 5px;
  float: none;
  margin-left: 0;
}

.sidebar.active ul li a span.badge {
  margin-left: 0 !important;
}

.sidebar.active ul ul a {
  padding: 10px !important;
}

.sidebar.active a[aria-expanded="false"]::before,
.sidebar.active a[aria-expanded="true"]::before {
  top: auto;
  bottom: 5px;
  right: 50%;
  -webkit-transform: translateX(50%);
  -ms-transform: translateX(50%);
  transform: translateX(50%);
}

.sidebar .sidebar-header {
  padding: 20px;
  background: #4463dc;
}

.sidebar .sidebar-header span {
  display: none;
  font-size: 1.8em;
}

.sidebar ul li a {
  padding: 16px 10px;
  font-size: 0.95em;
  letter-spacing: 0.6px;
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 400;
}

.sidebar ul li a:hover {
  color: #4c6ef5;
  background: #fff;
}

.sidebar ul li.active > a,
.sidebar a[aria-expanded="true"] {
  color: #fff;
  background: #4463dc;
}

@media (max-width: 900px) {
  .sidebar-header h1 {
    font-size: 2.2em;
    letter-spacing: 2px;
  }
  .sidebar {
    min-width: 110px;
    max-width: 100px;
    text-align: center;
  }

  .sidebar ul li a {
    padding: 20px 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .sidebar .sidebar-header h1,
  .sidebar .CTAs {
    display: none;
  }

  .sidebar .sidebar-header span {
    display: block;
  }
}

@media (max-width: 768px) {
  .sidebar {
    min-width: 110px;
    max-width: 100px;
    text-align: center;
    margin-left: 0 !important;
  }
  a[aria-expanded="false"]::before,
  a[aria-expanded="true"]::before {
    top: auto;
    bottom: 5px;
    right: 50%;
    -webkit-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%);
  }
  .sidebar.active {
    margin-left: 0 !important;
  }

  .sidebar ul li a span {
    font-size: 0.85em;
  }
  .sidebar ul ul a {
    padding: 10px !important;
  }

  .sidebar {
    margin-left: 0;
  }
  .sidebarCollapse span {
    display: none;
  }
}

@media (max-width: 480px) {
  .sidebar.active {
    min-width: 95px;
    max-width: 95px;
  }
}
</style>

<style>
.sidebar .sidebar-header h1 a,
.sidebar .sidebar-header span a {
  color: #fff;
}

.sidebar ul li a svg {
  margin-right: 10px;
  font-size: 19px;
}

@media (max-width: 900px) {
  .sidebar ul li a svg {
    margin-right: 0;
    display: block;
    font-size: 1.2em;
    margin-bottom: 5px;
    float: none;
    margin-left: 0;
  }
}
</style>
