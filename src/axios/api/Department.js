import request from "../request"

export function GetDepartment(params) {
    return request({
        url: '/department/getDepartment',
        method: 'get',
        params: params
    })
}

export function GetDepartmentNoSelect() {
    return request({
        url: '/department/getDepartmentNoSelect',
        method: 'get',
    })
}

