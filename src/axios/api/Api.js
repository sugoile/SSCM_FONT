import request from "../request"

export function GetApiList() {
    return request({
        url: '/api/getApiList',
        method: 'get'
    })
}

export function GetApiTree() {
    return request({
        url: '/api/getApiTree',
        method: 'get'
    })
}

export function CheckLinkRole(ID) {
    return request({
        url: '/api/checkLinkRole/' + ID,
        method: 'get'
    })
}

export function AssignApiToRole(ID, data) {
    return request({
        url: '/api/assignApiToRole/' + ID,
        method: 'post',
        data: data
    })
}


export function GetOneAndTwoApis() {
    return request({
        url: '/api/getOneAndTwoApis',
        method: 'get'
    })
}

export function AddApi(data){
    return request({
        url: '/api/addApi',
        method: 'post',
        data: data
    })
}

export function UpdateApi(ID, data){
    return request({
        url: '/api/updateApi/' + ID,
        method: 'post',
        data: data
    })
}

export function UpdatePApi(data){
    return request({
        url: '/api/updatePApi',
        method: 'post',
        data: data
    })
}

export function DelApi(ID) {
    return request({
        url: '/api/delApi/' + ID,
        method: 'get'
    })
}






