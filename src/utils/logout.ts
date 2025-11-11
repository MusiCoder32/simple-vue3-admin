import { logout } from '@/api/users'

const ssoOrigin = import.meta.env.VITE_SSO_ORIGIN

async function logoutFn() {
    window.$loading.open()
    const path = '/idp/authCenter/GLO?redirectToLogin=true&redirectToUrl='
    const match = location.origin.match(/^(https?:\/\/[^\/]+)/) //改成history模式后,location.origin会带路径
    const ssoLogoutUrl = ssoOrigin + path + match[1]
    try {
        const token = sessionStorage.getItem('token')
        await logout({ token })
        //接口返回清除后端token后才执行跳转到iam登录页
        sessionStorage.removeItem('token')

        //该iam路径只做清空信息动作,之后返回本项目页面,无法直接跳转iam的登录页面
        window.open(ssoLogoutUrl, '_self')
    } catch (e) {
        window.open(ssoLogoutUrl, '_self') //不管本平台成功还是失败都跳转iam,清除用户信息
        console.log(e)
    }
    window.$loading.close()
}

// 测试用退出登录地址
// https://ssosit.byd.com/idp/authCenter/GLO?redirectToLogin=true&redirectToUrl=http://localhost:8088

export default logoutFn
