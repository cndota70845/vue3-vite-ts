/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import {message} from 'ant-design-vue'
enum situation{
    node='当前环境变量：',
    baseURL='当前环境路径：',
    development='development',
    production='production'
}
if (process.env.NODE_ENV === situation.development) {
    console.log(situation.node+process.env.NODE_ENV)
    console.log(situation.baseURL+process.env.VUE_APP_BASE_URL)
}
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
const errorHandle = (status:any, other:any) => {
    // 状态码判断
    switch (status) {
        case 401:
            break;
        case 403:
            message.error('登录过期，请重新登录');
            setTimeout(() => {}, 1000);
            break;
        case 404:
            message.error('请求的资源不存在'); 
            break;
        case 500:
            message.error(other)
            break;
        default:
            message.error(other); 
    }
}

// 创建axios实例
let instance = axios.create();
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(    
    config => {return config},    
    error =>  message.error(error))

// 响应拦截器
instance.interceptors.response.use(    
    // 请求成功
    res => {
        if(res.status === 200){
            console.log(res);
            if(!res.headers.token){
                // logout()
            }
            switch(res.data.code){
                case 3:{
                    message.error('用户未登录');//用户未登录
                }
                case 4:{
                    message.error('没有权限');//没有权限
                }
            }
            return Promise.resolve(res)
        } else{
            return Promise.reject(res)

        } 
    },    
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.statusText);
            return Promise.reject(response);
        }
    });
export default instance;