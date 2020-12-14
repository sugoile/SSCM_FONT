import request from "../request"

export function AddTeacher(data) {
    return request({
        url: '/Teacher/AddTeacher',
        method: 'post',
        data: data
    })
}

export function GetTeacher(params) {
    return request({
      url: '/Teacher/getTeacher',
      method: 'get',
      params: params
    })
  }

export function UpdateTeacher(ID, data) {
    return request({
      url: '/Teacher/UpdateTeacher/' + ID,
      method: 'post',
      data: data
    })
  }

  export function DelTeacherOne(ID){
    return request({
      url: '/Teacher/DeleteOne/' + ID,
      method: 'get',
    })
  }
  
  export function DelTeacherList(params){
    return request({
      url: '/Teacher/Delete',
      method: 'get',
      params: params
    })
  }

export function GetTeacherNoSelect() {
    return request({
      url: '/Teacher/getTeacherNoSelect',
      method: 'get'
    })
  }



