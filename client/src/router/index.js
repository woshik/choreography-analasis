import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const publicRoutes = [
  {
    path: '/login',
    name: 'TrainerLogin',
    component: () => import(/* webpackChunkName: "trainer-login" */ '@/views/trainer/Login.vue'),
    meta: {
      title: 'Trainer Login Form',
    },
  },
  {
    path: '/registration',
    name: 'TrainerRegistration',
    component: () => import(/* webpackChunkName: "trainer-registration" */ '@/views/trainer/Registration.vue'),
    meta: {
      title: 'Trainer Registration Form',
    },
  },
  {
    path: '/login/trainee',
    name: 'TraineeLogin',
    component: () => import(/* webpackChunkName: "trainee-login" */ '@/views/trainee/Login.vue'),
    meta: {
      title: 'Trainee Login Form',
    },
  },

  {
    path: '/',
    component: () => import(/* webpackChunkName: "panel-layout" */ '@/views/Panel.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */'@/views/Dashboard.vue'),
        meta: {
          title: 'Dashboard',
          active: 'Dashboard',
        },
      },
      {
        path: '/exercise',
        name: 'Exercise',
        component: () => import(/* webpackChunkName: "manage-exercises" */'@/views/trainer/Exercise.vue'),
        meta: {
          title: 'Manage Exercise',
          active: 'Exercise',
        },
      },
      {
        path: '/exercise/add',
        name: 'AddExercise',
        component: () => import(/* webpackChunkName: "add-exercises" */'@/views/trainer/ExerciseForm.vue'),
        meta: {
          title: 'Add Exercise',
          active: 'Exercise',
        },
      },
      {
        path: '/exercise/assign/:id',
        name: 'AutomaticExercise',
        component: () => import(/* webpackChunkName: "automatic-exercises" */'@/views/trainer/AutomaticExercise.vue'),
        meta: {
          title: 'Assign Automatic Exercise',
          active: 'Exercise',
        },
      },
      {
        path: '/exercise/edit/:id',
        name: 'EditExercise',
        component: () => import(/* webpackChunkName: "edit-exercises" */'@/views/trainer/ExerciseForm.vue'),
        meta: {
          title: 'Edit Exercise',
          active: 'Exercise',
        },
      },
      {
        path: '/trainee',
        name: 'Trainee',
        component: () => import(/* webpackChunkName: "trainee" */ '@/views/trainer/Trainee.vue'),
        meta: {
          title: 'Manage Trainee',
          active: 'Trainee',
        },
      },
      {
        path: '/trainee/add',
        name: 'AddTrainee',
        component: () => import(/* webpackChunkName: "add-Trainee" */ '@/views/trainer/TraineeForm.vue'),
        meta: {
          title: 'Add Trainee',
          active: 'Trainee',
        },
      },
      {
        path: '/trainee/assign/:id',
        name: 'AssignExercise',
        component: () => import(/* webpackChunkName: "assign-exercise" */ '@/views/trainer/AssignExercise.vue'),
        meta: {
          title: 'Assign Exercise',
          active: 'Trainee',
        },
      },
      {
        path: '/trainee/edit/:id',
        name: 'EditTrainee',
        component: () => import(/* webpackChunkName: "edit-trainee" */ '@/views/trainer/TraineeForm.vue'),
        meta: {
          title: 'Edit Trainee',
          active: 'Trainee',
        },
      },
      {
        path: '/report',
        name: 'Report',
        component: () => import(/* webpackChunkName: "edit-trainee" */ '@/views/trainer/Report.vue'),
        meta: {
          title: 'Exercise Report',
          active: 'Report',
        },
      },
      {
        path: '/report/:traineeId',
        name: 'ExerciseList',
        component: () => import(/* webpackChunkName: "edit-trainee" */ '@/views/trainer/CompleteExercise.vue'),
        meta: {
          title: 'Exercise Report',
          active: 'Report',
        },
      },
      {
        path: '/report/:traineeId/:exerciseId',
        name: 'ShowReport',
        component: () => import(/* webpackChunkName: "edit-trainee" */ '@/views/trainer/ShowReport.vue'),
        meta: {
          title: 'Exercise Report',
          active: 'Report',
        },
      },
      {
        path: '/profile/trainer',
        name: 'TrainerProfile',
        component: () => import(/* webpackChunkName: "edit-trainee" */ '@/views/trainer/Profile.vue'),
        meta: {
          title: 'Profile',
        },
      },

      {
        path: '/profile/trainee',
        name: 'TraineeProfile',
        component: () => import(/* webpackChunkName: "edit-trainee" */ '@/views/trainee/Profile.vue'),
        meta: {
          title: 'Profile',
        },
      },

      {
        path: '/automatic-exercise',
        name: 'TraineeAutomaticExercise',
        component: () => import(/* webpackChunkName: "manage-exercises" */'@/views/trainee/Exercise.vue'),
        meta: {
          title: 'Automatic Exercise',
          active: 'TraineeAutomaticExercise',
        },
      },
      {
        path: '/trainee/automatic/:id',
        name: 'StartAutomaticExercise',
        component: () => import(/* webpackChunkName: "manual-exercise" */ '@/views/trainee/AutomaticExercise.vue'),
        meta: {
          title: 'Automatic Exercise',
          active: 'TraineeAutomaticExercise',
        },
      },
      {
        path: '/trainee/exercise/manual/:id',
        name: 'ManualExercise',
        component: () => import(/* webpackChunkName: "manual-exercise" */ '@/views/trainee/ManualExercise.vue'),
        meta: {
          title: 'Manual Exercise',
          active: 'Dashboard',
        },
      },

    ],
  },
];

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: publicRoutes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});

const router = createRouter();

// reset all route
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
