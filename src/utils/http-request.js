import Vue from 'vue'
import axios from 'axios'
import { Dialog } from "quasar";
import { Notify } from "quasar";
import merge from 'lodash/merge'

// import config from 'public/config'
// const showErrorInterval = 1000
// const refreshTokenInterval = 20 * 1000
const prototype = Vue.prototype

const showErrorInterval = 1000
const refreshTokenInterval = 20 * 1000
var lastShowErrorTime = 0
var showConfirmStatus = false
var isRefreshToken = false
var httpRequestArray = []

window.SITE_CONFIG = {}
// api接口请求地址
// window.SITE_CONFIG['baseUrl'] = process.env.WEB_URL
window.SITE_CONFIG['baseUrl'] = 'http://localhost:8001'
window.SITE_CONFIG['imUrl'] = 'http://localhost:8090'
// 'http://127.0.0.1:8803' +getContextPath()
// window.SITE_CONFIG['baseUrl'] = baseURL

// cdn地址 = 域名 + 版本号
// window.SITE_CONFIG['domain'] = './' // 域名
// window.SITE_CONFIG['version'] = '' // 版本号(年月日时分)
// window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version

const axiosRequest = axios.create({
    timeout: 1000 * 10,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

const http = function (param) {// 封装后的REST请求方法
    return new Promise(
        (resolve, reject) => {
            let loginAgainRequest = () => {
                if (!showConfirmStatus) {
                    showConfirmStatus = true
                    Dialog.create({
                            message: '您的登录已过期，请重新登录',
                            persistent: true
                    }).onOk(() => {
                        // console.log('prototype:', prototype)
                        prototype.$routerObj.push({path: "/user/login"})
                        showConfirmStatus = false
                    })
                }
            }
            let httpRequest = (requestParam, resolveFunc, rejectFunc) => {
                let token = window.sessionStorage.getItem("token")
                if (token) {
                    if (requestParam.headers) {
                        requestParam.headers.accessToken = token
                    } else {
                        requestParam.headers = {
                            accessToken: token
                        }
                    }
                }
                axiosRequest(requestParam)
                    .then((res) => {
                        if (res.data != null && res.data.code != null) {
                            let code = parseInt(res.data.code)
                            if (code === 501) {
                                loginAgainRequest()
                            }
                        }
                        resolveFunc(res)
                    })
                    .catch((res) => {
                        let nowTime = new Date().getTime()
                        if ((nowTime - lastShowErrorTime) > showErrorInterval) {
                            Notify.create({type: 'negative', message: '网络链接错误'})
                            console.error('Net error:')
                            lastShowErrorTime = nowTime
                        }
                        rejectFunc(res)
                    })
            }
            let token = window.sessionStorage.getItem("token")
            let shouldRefreshToken = token &&
                (new Date().getTime() - window.sessionStorage.getItem("resetTime")) > refreshTokenInterval
            if (shouldRefreshToken) {
                httpRequestArray.push(() => {
                    httpRequest(param, resolve, reject)
                })
                let requestTask = () => {
                    for (let httpRequestObj of httpRequestArray) {
                        httpRequestObj()
                    }
                    httpRequestArray = []
                    isRefreshToken = false
                }
                if (!isRefreshToken) {
                    isRefreshToken = true
                    axiosRequest({
                        url: http.adornUrl('/refreshToken'),
                        method: 'get',
                        params: http.adornParams({
                            'token': token,
                        }),
                    }).then((res) => {
                        let data = res.data
                        if (data && data.code === 200) {
                            console.log("token续约成功" + data.token)
                            window.sessionStorage.setItem("token", data.token)
                            window.sessionStorage.setItem("resetTime", new Date().getTime())
                            requestTask()
                        } else {
                            requestTask()
                        }
                        // eslint-disable-next-line no-unused-vars
                    }).catch((res) => {
                        requestTask()
                    })
                }
            } else {
                httpRequest(param, resolve, reject)
            }
        }
    )
}

/*
function getContextPath() {
    // eslint-disable-next-line no-undef
    let contextPath = config.backend.contextPath
    contextPath = (contextPath != null &&
        contextPath !== '' &&
        contextPath.replace(/\//g, '') !== '') ?
        ((contextPath.indexOf('/') === 0 ? '' : '/') + contextPath) :
        ''
    return contextPath
}

 */

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */

http.adornUrl = (actionName) => {
    return window.SITE_CONFIG.baseUrl + actionName
}

http.imUrl = (actionName) => {
    return window.SITE_CONFIG.imUrl + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefaultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefaultParams = true) => {
    const defaults = {
        't': new Date().getTime()
    }
    return openDefaultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefaultData 是否开启默认数据?
 * @param {*} contentType 数据格式
 *    json: 'application/json; charset=utf-8'
 *    form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefaultData = true, contentType = 'json') => {
    const defaults = {
        't': new Date().getTime()
    }
    data = openDefaultData ? merge(defaults, data) : data
    // eslint-disable-next-line no-undef
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
