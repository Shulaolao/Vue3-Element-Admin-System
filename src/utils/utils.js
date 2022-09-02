import path from 'path'

/**
 * @param {Object|String|Number} time
 * @param {String} cFormat
 * @return {String|null}
**/
export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        time = time.replace(/[-]/gm, '/')
        console.log(time)
      }
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

/**
 * @param {String} relPath
 * @param {String} basePath
 * @return {String}
 **/
export const pathResolve = (basePath, relPath) => {
  return path.resolve(basePath, relPath)
}

/**
*   @param {String} str
*   @return {String}
**/
export function firstLetterUpper (str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

// /**
//  * @param {String} el
//  * @param {String} className
//  **/
// export function toggleClass (el, className) {
//   if (!el || !className) return
//   const dom = document.querySelector(el)
//   const index = dom.className.indexOf(className)
//   if (index === -1) {
//     console.log(dom.classList)
//     dom.className += '' + className
//   } else {
//     const reg = new RegExp(className)
//     dom.className = dom.className.replace(reg, '')
//   }
// }

/**
 * 节流
 * @param {Function} fn
 * @param {Number} delay
**/
export function throttle (fn, delay) {
  let flag = true
  return function () {
    if (flag) return
    flag = false
    const args = arguments
    const timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer)
      flag = false
    }, delay)
  }
}

/**
 * @param {Function} fn
 * @param {Number} delay
 **/
export function debounce (fn, delay) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    const args = arguments
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function getNowTime () {
  const nowTime = new Date()
  const year = nowTime.getFullYear()
  const month = nowTime.getMonth() + 1
  const date = nowTime.getDate()
  const day = nowTime.getDay() + 1
  const hour = nowTime.getHours()
  const minutes = nowTime.getMinutes()
  const second = nowTime.getSeconds()

  const dayDivision = (hour >= 0 && hour < 6) ? '凌晨' : (hour >= 6 && hour < 12) ? '早上' : (hour >= 12 && hour < 13) ? '中午' : (hour >= 13 && hour < 18) ? '下午' : '晚上'

  return {
    year, month, date, day, hour, dayDivision, minutes, second
  }
}
