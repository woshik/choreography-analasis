const userStorageName = 'user_data';
const tokenStorageName = 'accessToken';
let userData;
let token;

try {
  userData = JSON.parse(localStorage.getItem(userStorageName));
  token = JSON.parse(localStorage.getItem(tokenStorageName));
} catch (error) {
  userData = {};
  token = '';
}

export default {
  namespaced: true,
  state: {
    token,
    user: userData,
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.user = payload;
    },
    SET_ACCESS_TOKEN(state, payload) {
      state.token = payload;
    },
    LOGOUT_USER(state) {
      state.token = '';
      state.user = {};
    },
  },
  actions: {
    setUserData({ commit }, payload) {
      localStorage.setItem(userStorageName, JSON.stringify(payload));
      commit('SET_USER_DATA', payload);
    },
    setAccessToken({ commit }, payload) {
      localStorage.setItem(tokenStorageName, JSON.stringify(payload));
      commit('SET_ACCESS_TOKEN', payload);
    },
    updateUserData({ commit, state }, payload) {
      const data = {
        ...state.user,
        ...payload,
      };

      localStorage.setItem(userStorageName, JSON.stringify(data));
      commit('SET_USER_DATA', data);
    },
    logoutUser({ commit }) {
      localStorage.removeItem(userStorageName);
      localStorage.removeItem(tokenStorageName);
      commit('LOGOUT_USER');
    },
  },
  getters: {
    getUserFullName: ({ user }) => user.fullName,
    getUsername: ({ user }) => user.username,
    getUserDob: ({ user }) => user.dob,
    getUserRole: ({ user }) => user.role,
    getUserToken: ({ token: accessToken }) => accessToken,
    isTrainer: ({ user }) => user.role === 'trainer',
  },
};
