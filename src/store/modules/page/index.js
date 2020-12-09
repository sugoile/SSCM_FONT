export default {
  state: {
    AsideIndex: ["/index"],
    LeftIndex: ["/index"],
    Tabs: [{
      title: "首页",
      path: "/index",
    }],
    ActiveIndex: "/index",
    AsideMenu: [],
  },
  mutations: {
    SET_ASIDEINDEX(state, data) {
      state.AsideIndex = data;
    },
    SET_LEFTINDEX(state, data) {
      state.LeftIndex = data;
    },
    SET_TABS(state, data) {
      state.Tabs = data;
    },
    SET_ACTIVEINDEX(state, data) {
      state.ActiveIndex = data;
    },
    SET_ASIDEMENU(state, data) {
      state.AsideMenu = data;
    },
  },
  actions: {}
}
