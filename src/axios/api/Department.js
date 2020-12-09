import request from "../request"

export function GetDepartment(params) {
    return request({
        url: '/department/getDepartment',
        method: 'get',
        params: params
    })
}
