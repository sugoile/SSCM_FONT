import request from "../request"

export function AddStudent(data) {
    return request({
        url: '/Student/AddStudent',
        method: 'post',
        data: data
    })
}

export function GetStudent(params) {
    return request({
      url: '/Student/getStudent',
      method: 'get',
      params: params
    })
  }

export function UpdateStudent(ID, data) {
    return request({
      url: '/Student/UpdateStudent/' + ID,
      method: 'post',
      data: data
    })
  }

  export function DelStudentOne(ID){
    return request({
      url: '/Student/DeleteOne/' + ID,
      method: 'get',
    })
  }
  
  export function DelStudentList(params){
    return request({
      url: '/Student/Delete',
      method: 'get',
      params: params
    })
  }





