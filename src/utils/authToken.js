export const setToken = (token) => {
  localStorage.setItem('vue3-element-admin_Token', token)
}

export const getToken = () => {
  return localStorage.getItem('vue3-element-admin_Token')
}

export const getRefreshToken = () => {
  localStorage.getItem('vue3-element-admin_Refresh_Token')
}

export const removeToken = () => {
  localStorage.removeItem('vue3-element-admin_Token')
}
