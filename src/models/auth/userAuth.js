import {Redirect} from "react-router-dom"

const loginPath = "/auth/login"

export function clearLogout() {
    window.localStorage.removeItem('userid')
    window.localStorage.removeItem('userToken')
    window.localStorage.removeItem('tokenExpire')
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