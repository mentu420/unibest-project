import dayjs from 'dayjs'
import i18n from '@/locale/'

// 将 100000 转换为 100,000
export function formatNumber(value) {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 精度处理
export function formatMoney(value, precision = 2) {
  return '$' + Number(value).toFixed(precision)
}

export function formatNumberWithK(value) {
  if (value >= 1000) {
    const suffixes = ['', 'k', 'M', 'B', 'T']
    const suffixIndex = Math.floor(Math.log10(value) / 3)
    const shortValue = (value / Math.pow(1000, suffixIndex)).toFixed(1)
    return '$' + (shortValue + suffixes[suffixIndex])
  }

  return formatMoney(value).toString()
}

// Promise 版modal
export const showModal = (
  content,
  { showCancel, title, ...options }: UniApp.ShowModalOptions = {},
) => {
  const cancelText = options.cancelText || i18n.global.t('common.cancel')
  const confirmText = options.confirmText || i18n.global.t('common.confirm')
  return new Promise((resolve, reject) =>
    uni.showModal({
      showCancel: showCancel === true,
      title: title || i18n.global.t('common.tips'),
      ...options,
      content,
      cancelText,
      confirmText,
      success(e) {
        if (e.confirm) {
          return resolve(e)
        }
        reject(e)
      },
      fail: reject,
    }),
  )
}

export function copyTextToClipboard(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

// 合并Promise请求
export function mergingStep(wrapped) {
  let runningInstance = null
  return function (...args) {
    if (runningInstance) {
      // 若步骤正在进行，则监听并使用其执行结果，而不是重新发起该步骤
      return runningInstance
    }
    const res = wrapped.apply(this, args)

    if (!(res instanceof Promise)) {
      return res
    }
    runningInstance = res
    runningInstance
      .then(function () {
        runningInstance = null
      })
      .catch(function () {
        runningInstance = null
      })
    return runningInstance
  }
}

// 保留可选小数
export function toFixed(num, fixed) {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
  if (Number(num) === 0) {
    return Number(num).toFixed(fixed)
  }
  try {
    return num.toString().match(re)[0]
  } catch {
    return num
  }
}

export function getUrlParams(url, key) {
  if (!url) return
  // 通过 ? 分割获取后面的参数字符串
  const urlStr = url.split('?')[1]
  if (!urlStr) return ''
  // 创建空对象存储参数
  const obj = {}
  // 再通过 & 将每一个参数单独分割出来
  const paramsArr = urlStr.split('&')
  for (let i = 0, len = paramsArr.length; i < len; i++) {
    // 再通过 = 将每一个参数分割为 key:value 的形式
    const arr = paramsArr[i].split('=')
    obj[arr[0]] = arr[1]
  }
  return key ? obj[key] : obj
}

// 四舍五入保留两位小数
export function toDecimal2(num, n = 2) {
  let f = parseFloat(num)
  if (isNaN(f)) {
    return false
  }
  f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n) // n 幂
  let s = f.toString()
  let rs = s.indexOf('.')
  // 判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + n) {
    s += '0'
  }
  return s
}

// 金额格式化
export const moneyFormatter = (value) => {
  return value
    .replace(/[^\d^.]+/g, '') // 第二步：把不是数字，不是小数点的过滤掉
    .replace(/^0+(\d)/, '$1') // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
    .replace(/^\./, '0.') // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
    .match(/^\d*(\.?\d{0,2})/g)[0] // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有0到2位小数
}

/**
 * @description: 时间格式转换
 * @param {Date} date
 * @param {string} format
 */
export function dateFormat(date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}

// 判断一个字符串是否为JSON字符串
export const isObjectString = (value) => {
  try {
    JSON.parse(value)
    return true
  } catch (error) {
    return false
  }
}
