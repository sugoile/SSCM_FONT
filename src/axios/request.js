import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '../router'
import {
  Message
} from 'element-ui'

const service = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 15000 //超时时间
})

//request拦截器(配置一个请求头中带token)
service.interceptors.request.use(req => {
  NProgress.start();
  req.headers.Authorization = window.sessionStorage.getItem('token')
  return req
})

//配置response拦截器（返回错误的处理结果）
service.interceptors.response.use(response => {
  NProgress.done();
  const res = response.data;
  //取消权限不足跳回登录页面的情况
  if (res.code === 401) {
    router.push({path: '/login'})
    Message({
      message: res.message,
      type: 'error',
      duration: 3 * 1000
    })
  }
  return response
})

export default service
