import request from "../request"

export function GetRoleList(params) {
    return request({
      url: '/role/getRoleList',
      method: 'get',
      params: params
    })
  }

  export function AddRole(data) {
    return request({
      url: '/role/addRole',
      method: 'post',
      data: data
    })
  }

  export function UpdateRole(ID, data) {
    return request({
      url: '/role/updateRole/' + ID,
      method: 'post',
      data: data
    })
  }

  export function DelRole(ID) {
    return request({
      url: '/role/delRole/' + ID,
      method: 'get',
    })
  }

  export function DelRoleList(params) {
    return request({
      url: '/role/delRoleList',
      method: 'get',
      params: params
    })
  }

  export function CheckRoleAdminRel(ID) {
    return request({
      url: '/role/checkRoleAdminRel/' + ID,
      method: 'get',
    })
  }

  export function CheckRoleAdminRelList(params) {
    return request({
      url: '/role/checkRoleAdminRelList',
      method: 'get',
      params: params
    })
  }

  export function GetAssignAdminList() {
    return request({
      url: '/role/getAssignAdminList',
      method: 'get',
    })
  }   
  
  export function CheckLinkAdmin(ID) {
    return request({
      url: '/role/checkLinkAdmin/' + ID,
      method: 'get',
    })
  }

  export function AssignRoleToAdmin(ID, data) {
    return request({
      url: '/role/assignRoleToAdmin/' + ID,
      method: 'post',
      data: data
    })
  }

  export function CheckLinkMenu(ID) {
    return request({
      url: '/role/checkLinkMenu/' + ID,
      method: 'get',
    })
  }

  export function AssignRoleToMenu(ID, data) {
    return request({
      url: '/role/assignRoleToMenu/' + ID,
      method: 'post',
      data: data
    })
  }

  export function CheckLinkApi(ID) {
    return request({
      url: '/role/checkLinkApi/' + ID,
      method: 'get',
    })
  }

  export function AssignRoleToApi(ID, data) {
    return request({
      url: '/role/assignRoleToApi/' + ID,
      method: 'post',
      data: data
    })
  }


  

  

  