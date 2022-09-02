export const setLocaleI18n = (value) => {
  localStorage.setItem('vue3-element-admin_I18n', value)
}

export const getLocaleI18n = () => {
  return localStorage.getItem('vue3-element-admin_I18n')
}
