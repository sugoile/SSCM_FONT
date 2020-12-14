import request from "../request"

export function AddCourse(data) {
    return request({
        url: '/Course/AddCourse',
        method: 'post',
        data: data
    })
}

export function GetCourse(params) {
    return request({
      url: '/Course/getCourse',
      method: 'get',
      params: params
    })
  }

export function UpdateCourse(ID, data) {
    return request({
      url: '/Course/UpdateCourse/' + ID,
      method: 'post',
      data: data
    })
  }

  export function DelCourseOne(ID){
    return request({
      url: '/Course/DeleteOne/' + ID,
      method: 'get',
    })
  }
  
  export function DelCourseList(params){
    return request({
      url: '/Course/Delete',
      method: 'get',
      params: params
    })
  }

  export function UpdateStates(id, params){
    return request({
      url: '/Course/UpdateStates/' + id,
      method: 'get',
      params: params
    })
  }
  





