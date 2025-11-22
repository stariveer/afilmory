import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { atom } from 'jotai'
import { initReactI18next } from 'react-i18next'

import { resources } from './@types/resources'
import { jotaiStore } from './lib/jotai'

const i18n = i18next.createInstance()
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'zh-CN', // 强制使用简体中文
    fallbackLng: {
      default: ['zh-CN'], // 回退语言也设置为简体中文
    },
    defaultNS: 'app',
    resources,
  })

export const i18nAtom = atom(i18n)

export const getI18n = () => {
  return jotaiStore.get(i18nAtom)
}
