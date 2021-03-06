import {Redirect} from "react-router-dom"

const loginPath = "/auth/login"

/**
 * 退出登陆清理数据
 */
export function clearLogout() {
    window.localStorage.removeItem('userid')
    window.localStorage.removeItem('userToken')
    window.localStorage.removeItem('tokenExpire')
}

/**
 * 设置身份验证信息
 * @param userid {string}
 * @param userToken {string}
 * @param tokenExpire {number}
 */
export function setAuthInfo(userid, userToken, tokenExpire) {
    window.localStorage.setItem('userid', userid)
    window.localStorage.setItem('userToken', userToken)
    window.localStorage.setItem('tokenExpire', tokenExpire)
}

/**
 * 获取记住用户名称
 * @returns {string}
 */
export function getRememberUsername() {
    return window.localStorage.getItem('memberUsername')
}

/**
 * 记住用户名称
 * @param username
 */
export function setRememberUsername(username) {
    window.localStorage.setItem('memberUsername', username)
}


export function requireAuth(Layout, props) {
    let isLogin = false

    let userid = window.localStorage.getItem('userid')
    let token = window.localStorage.getItem('userToken')
    let tokenExpire = window.localStorage.getItem("tokenExpire")

    do {
        if (!userid || !token || !tokenExpire)
            break

        if (token.length !== 32)
            break

        tokenExpire = parseInt(tokenExpire)
        let nowTime = Date.parse(new Date()) / 1000;
        //token expire
        if (tokenExpire < nowTime)
            break;

        isLogin = true
    } while (false)

    if (!isLogin)
        return <Redirect to={loginPath}/>

    return <Layout {...props}/>
}