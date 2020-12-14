import request from "../request"

export function UserLogin(data) {
  return request({
    url: '/SORTController/UserLogin',
    method: 'post',
    data: data
  })
}

export function GetTeacherByID(ID) {
  return request({
    url: '/SORTController/getTeacherByID/' + ID,
    method: 'get',
  })
}

export function GetStudentByID(ID) {
  return request({
    url: '/SORTController/getStudentByID/' + ID,
    method: 'get',
  })
}

export function GetCourceByID(ID) {
  return request({
    url: '/SORTController/getCourceByID/' + ID,
    method: 'get',
  })
}

export function GetChooseCourceByID(ID) {
  return request({
    url: '/SORTController/getChooseCourceByID/' + ID,
    method: 'get',
  })
}

export function ChooseCource(ID, params) {
  return request({
    url: '/SORTController/chooseCource/' + ID,
    method: 'get',
    params: params
  })
}

export function NochooseCourse(ID, params) {
  return request({
    url: '/SORTController/NochooseCourse/' + ID,
    method: 'get',
    params: params
  })
}

export function GetCourceByTID(ID) {
  return request({
    url: '/SORTController/getCourceByTID/' + ID,
    method: 'get',
  })
}

export function GetChooseCourceByCID(ID, params) {
  return request({
    url: '/SORTController/getChooseCourceByCID/' + ID,
    method: 'get',
    params: params
  })
}

export function ScoreToS(params) {
  return request({
    url: '/SORTController/ScoreToS',
    method: 'get',
    params: params
  })
}







