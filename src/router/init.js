
export function RouterChange(commit, state, TreeMenus , ListMenus, to) {
  let path = [];
  path[0] = "/" + to.path.split("/")[1];
  path[1] = to.path;

  commit('SET_LEFTINDEX', path);
  let tabs = state.pageModule.Tabs;
  let dataTree = TreeMenus;
  let dataList = ListMenus;
  if (path[0] !== "/index") {
    for (var i in dataTree) {
      if (dataTree[i].path === path[0]) {
        commit('SET_ASIDEMENU', dataTree[i]);
        break;
      }
    }
    commit('SET_ASIDEINDEX', path);
  } else {
    commit('SET_ASIDEINDEX', path[0]);
    commit('SET_ASIDEMENU', ["/index"]);
  }

  let flag = false;
  for (var i in tabs) {
    if (tabs[i].path === to.path) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    for (var i in dataList) {
      if (to.path === dataList[i].path) {
        tabs.push({
          title: dataList[i].fontMenuName,
          path: dataList[i].path,
        })
      }
    }
    commit('SET_TABS', tabs);
  }
  commit('SET_ACTIVEINDEX', to.path);
}
