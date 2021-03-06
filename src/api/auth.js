import request from "../utils/request";

/**
 * 登陆接口
 * @param username {string}
 * @param password {string}
 * @returns {Promise<AxiosResponse<any>>}
 */
const apiLogin = ({username, password}) => request.post('/management/auth/login', {
    username: username,
    password: password
})

/**
 * 退出登陆接口
 * @returns {Promise<AxiosResponse<any>>}
 */
const apiLogout = () => request.patch('/management/auth/logout')

export {
    apiLogin,
    apiLogout
}