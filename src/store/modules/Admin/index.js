import { login } from "@/axios/api/Admin"

export default {
    state: {
        ListMenus: [],
        TreeMenus: [],
        Authorities: [],
        Username: '',
        Nickname: '',
    },
    mutations: {
      SET_LISTMENUS(state, data) {
        state.ListMenus = data;
      },
      SET_TREEMENUS(state, data) {
        state.TreeMenus = data;
      },
      SET_AUTHORITIES(state, data) {
        state.Authorities = data;
      },
      SET_USERNAME(state, data) {
        state.Username = data;
      },
      SET_NICKNAME(state, data) {
        state.Nickname = data;
      },
    },
    actions: {
    }
  }
  