import { createI18n } from 'vue-i18n'
import cn from './lang/cn'
import en from './lang/en'
import { getLocaleI18n, setLocaleI18n } from '@/utils/localStorage.js'

const messages = {
  cn,
  en
}

const locale = getLocaleI18n() || 'cn'
if (!getLocaleI18n()) {
  setLocaleI18n(locale)
}

export const localeI18n = locale
export const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'cn',
  messages,
  globalInjection: true
})
