import { mergingStep } from '@/utils/common'
import { setStorage, getStorage } from '@/utils/storage'
import md5 from 'js-md5'
import qs from 'qs'
import storage from '../enums/storage'

import { http } from '@/utils/http'

import i18n from '@/locale/'

/** 获取 token */
export const requestToken = mergingStep(async () => {
  const { initDataUnsafe } = window.Telegram?.WebApp ?? {}
  const { id = '777', username = '789', first_name: nickname = '123' } = initDataUnsafe?.user || {}

  console.log('tokenStore')
  const tokenStore = getStorage(storage.token)
  console.log(tokenStore)
  if (tokenStore?.telegram_id === id) {
    return tokenStore.token
  }

  const timestamp = new Date().valueOf()
  const loginData = {
    nickname,
    telegram_id: id,
    timestamp,
    username,
  }
  const hash = md5(
    qs.stringify(
      {
        ...loginData,
        token: 'e25aa43a2739a4a094e14952edaf61735489e6c21c280d822c170bb7de79df16',
      },
      {
        encode: false,
      },
    ),
  )
  console.log('hash', hash)
  const data = await http({
    url: '/api/mp/login',
    method: 'POST',
    data: { ...loginData, hash },
    withToken: false,
  })
  console.log('data', data)
  setStorage(storage.token, { ...data, telegram_id: id })
  return data
})

export const getSign = async () => {
  const { token } = getStorage(storage.token)
  return `Bearer ${token}`
}
