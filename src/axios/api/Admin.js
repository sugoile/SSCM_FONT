import request from "../request"

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function GetMenuList(params) {
  return request({
    url: '/admin/getMenuList',
    method: 'get',
    params: params
  })
}

export function GetMenuTree(params) {
    return request({
      url: '/admin/getMenuTree',
      method: 'get',
      params: params
    })
  }

export function Register(data){
  return request({
    url: '/admin/Register',
    method: 'post',
    data: data
  })
}

export function GetAdminList(ID, params){
  return request({
    url: '/admin/getAdminList/' + ID,
    method: 'get',
    params: params
  })
}

export function DelAdminOne(selfID, ID){
  return request({
    url: '/admin/delAdminOne/' + selfID,
    method: 'get',
    params: ID
  })
}

export function DelAdminList(selfID, data){
  return request({
    url: '/admin/delAdminList/' + selfID,
    method: 'get',
    params: data
  })
}

export function GetEditAdmin(ID){
  return request({
    url: '/admin/getEditAdmin/' + ID,
    method: 'get',
  })
}

export function UpdateAdmin(ID, data){
  return request({
    url: '/admin/updateAdmin/' + ID,
    method: 'post',
    data: data
  })
}

export function UpdateStatu(ID, param){
  return request({
    url: '/admin/updateStatu/' + ID,
    method: 'get',
    params: param
  })
}

export function AssignAdminToRole(ID, data) {
  return request({
    url: '/admin/assignAdminToRole/' + ID,
    method: 'post',
    data: data
  })
}

export function GetAssignRoleList() {
  return request({
    url: '/admin/getAssignRoleList',
    method: 'get',
  })
}

export function CheckLinkRole(ID) {
  return request({
    url: '/admin/checkLinkRole/' + ID,
    method: 'get',
  })
}





