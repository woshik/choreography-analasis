import Vue from 'vue';
import Vuex from 'vuex';
import rootModule from './rootModule';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: rootModule,
});
