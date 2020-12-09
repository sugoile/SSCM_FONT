export default {
  AsideIndex: state => state.pageModule.AsideIndex,             //侧边栏active的index path ["/student", ["/student/basic"]]
  LeftIndex: state => state.pageModule.LeftIndex,               //top上的左边侧边栏的index path
  Tabs: state => state.pageModule.Tabs,                         //container的tabs标签
  ActiveIndex: state => state.pageModule.ActiveIndex,           //tab标签所选的index
  AsideMenu: state => state.pageModule.AsideMenu,               //侧边栏aside的菜单
  Authorities: state => state.AdminModule.Authorities,          //角色
  Username: state => state.AdminModule.Username,                //用户名
  Nickname: state => state.AdminModule.Nickname,                //用户别名
  ListMenus: state => state.AdminModule.ListMenus,                //从后端获取线性的菜单信息
  TreeMenus: state => state.AdminModule.TreeMenus,                //从后端获取树性的菜单信息
}
