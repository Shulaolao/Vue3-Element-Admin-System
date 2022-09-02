/**
*   @param {String} url
*   @return {Object}
**/
export function params2Obj (url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) return {}
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(item => {
    const index = item.indexOf('=')
    const name = item.substring(0, index)
    const value = item.substring(index + 1, item.length)
    obj[name] = value
  })
  return obj
}
