/* eslint-disable no-param-reassign */
import qs from 'qs'
import { useUserStore } from '@/store'
import { platform } from '@/utils/platform'
import { getSign } from '@/apis/auth'

export type CustomRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>
  /** 出错时是否隐藏错误提示 */
  hideErrorToast?: boolean
  withToken?: boolean
} & IUniUploadFileOptions // 添加uni.uploadFile参数类型

// 请求基准地址
const baseUrl = import.meta.env.VITE_SERVER_BASEURL

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  async invoke(options: CustomRequestOptions) {
    console.log('invoke', options)
    // 接口请求支持通过 query 参数配置 queryString
    if (options.query) {
      const queryStr = qs.stringify(options.query)
      if (options.url.includes('?')) {
        options.url += `&${queryStr}`
      } else {
        options.url += `?${queryStr}`
      }
    }
    // 非 http/https 开头需拼接地址
    if (!options.url.startsWith('http') || !options.url.startsWith('https')) {
      options.url = baseUrl + options.url
      // TIPS: 如果需要对接多个后端服务，也可以在这里处理，拼接成所需要的地址
    }
    // 1. 请求超时
    options.timeout = 10000 // 10s
    const { withToken = true } = options
    // 3. 添加 token 请求头标识
    options.header = {
      platform,
      ...options.header,
      ...(await getSign(withToken)),
    }
    console.log('options', options)
  },
}

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor('request', httpInterceptor)
    // 拦截 uploadFile 文件上传
    uni.addInterceptor('uploadFile', httpInterceptor)
  },
}
