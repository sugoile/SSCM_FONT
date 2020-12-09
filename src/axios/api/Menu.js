import request from "../request"

export function GetMenuList() {
    return request({
        url: '/menu/getMenuList',
        method: 'get'
    })
}

export function GetMenuTree() {
    return request({
        url: '/menu/getMenuTree',
        method: 'get'
    })
}
