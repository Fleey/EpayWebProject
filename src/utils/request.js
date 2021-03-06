import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

/**
 * 退出登录
 */
const redLogOutReload = errData => {
    message.error(errData.msg)
    // store.dispatch('logOut')
}

/**
 * 403错误处理
 * @param {Object} errData 错误信息
 */
const localLessTokenSign = errData => {
    if (errData.code === 403527) {
        message.error('本地时间小于生成token签名时间')
    }
}

/**
 * 请求频率限制
 * @param {Object} errData 错误信息
 */
const operateFrequent = () => {
    message.error('您的操作太频繁了~')
}

/**
 * 对应的状态处理方法
 * @param {String} status 状态码
 * @param {Object} errData 错误信息
 */
const createErrorHandler = (status, errData) => {
    const errorCodeFns = {
        401: redLogOutReload,
        403: localLessTokenSign,
        429: operateFrequent
    }
    if (errorCodeFns[status]) {
        errorCodeFns[status](errData)
    }
}

const server = axios.create({
    timeout: 5000,
    baseURL: process.env.API_DOMAIN,
    headers: {
        Accept: 'application/vnd.hamster_action.v1+json',
    },
    transformRequest: [(data) => !(data instanceof FormData) ? qs.stringify(data) : data],
    validateStatus: function (status) { // http状态码的成功判断
        // 402 状态码 用于登录时只输入账号和密码不输入谷歌验证码时返回，提示需要输入谷歌验证码
        return status >= 200 && status < 300 || status === 402 // 默认的
    }
})

server.interceptors.request.use(config => {
    let userid = window.localStorage.getItem('userid')
    let userToken = window.localStorage.getItem('userToken')
    if (userid) {
        config.headers['x-userid'] = userid
    }
    if (userToken) {
        config.headers['x-token'] = userToken
    }

    return config
}, err => {
    return Promise.reject(err)
})

server.interceptors.response.use(res => {
    return res.data
}, error => {
    if (error.response) {
        const {response: {status, data: errData}} = error
        createErrorHandler(status, errData)
        return Promise.reject(errData)
    } else {
        if (error.message === 'timeout of 5000ms exceeded') {
            message.error('网络不佳~')
        } else {
            message.error(error.message)
        }
        return Promise.reject(new Error(error.message))
    }
})

export default server