import axios from 'axios'
import router from '../router'
import { merge, isNil, isObject } from 'lodash'

type RequestConfig = {
    url: string
    data?: object
    showError?: boolean
    otherConfig?: object
}

// #region config
let baseUrl = ''
const timeout = 60 * 1000
const MODE = import.meta.env.MODE
if (MODE === 'development') {
    baseUrl = '/mock'
} else if (MODE === 'production') {
    baseUrl = ''
}
// #endregion config

const service = axios.create({
    timeout: timeout,
})

export async function request(requestConfig) {
    const { url, data, method, showError = true, otherConfig } = requestConfig

    if (data && isObject(data) && !Array.isArray(data)) {
        Object.keys(data).forEach((key) => {
            if (isNil(data[key])) {
                delete data[key]
            }
        })
    }

    // #region Content-Type
    const defaultConfig = {
        url: baseUrl + url,
        method,
        headers: {
            //设置请求头信息
            Authorization: sessionStorage.getItem('token'),
            'Content-Type': method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json; charset=UTF-8',
        },
    }
    // #endregion Content-Type

    if (method === 'GET') {
        defaultConfig.params = data
    } else {
        defaultConfig.data = data
    }

    const configResult = merge(
        defaultConfig,
        otherConfig, //otherConfig的配置会覆盖defaultConfig
    )
    let result
    try {
        // #region response
        const res = await service(configResult)
        const { data, headers } = res
        if (data?.code == 200) {
            result = data.data
        } else if (configResult.responseType === 'blob') {
            result = data
        } else if (data?.code == 888) {
            window.open(headers.sso, '_self')
        } else {
            result = reqError(data?.code, data?.message, showError)
        }
        // #endregion response
    } catch (e) {
        console.log(e)
        result = reqError(e?.response?.status, e?.response?.statusText, showError)
    }

    return result
}
// #region error
function reqError(code, message, showError: boolean) {
    //根据与后端协商情况，采用message提示，还是采用code码提示
    const messageCode = code || 'default'
    const msg = $t('error message.' + messageCode)
    if (showError) {
        ElMessage.error(msg)
    }
    switch (+code) {
        case 401:
            setTimeout(() => {
                router.push({ name: 'login' })
            }, 3000) //ElMessage的默认关闭时间是3000ms
            break
        default:
            break
    }

    return Promise.reject(msg)
}
// #endregion error

export default {
    get(requestConfig: RequestConfig) {
        return request({ ...requestConfig, method: 'GET' })
    },
    post(requestConfig: RequestConfig) {
        return request({ ...requestConfig, method: 'POST' })
    },
    put(requestConfig: RequestConfig) {
        return request({ ...requestConfig, method: 'PUT' })
    },
    del(requestConfig: RequestConfig) {
        return request({ ...requestConfig, method: 'DELETE' })
    },
}
