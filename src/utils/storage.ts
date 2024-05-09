export const paltName = `${import.meta.env.VITE_APP_APP_TAG}_`

const platKey = (key) => paltName + key
const isJSON = (value) => {
  try {
    JSON.parse(value)
    return true
  } catch (error) {
    return false
  }
}

export const getStorage = (key, isPalt = true) => {
  const value = uni.getStorageSync(isPalt ? platKey(key) : key)
  if (isJSON(value)) {
    try {
      return JSON.parse(value)
    } catch (err) {
      return value
    }
  }
  return value
}

export const removeStorage = (key, isPalt = true) => {
  uni.removeStorageSync(isPalt ? platKey(key) : key)
}

export const setStorage = (key, value, isPalt = true) => {
  if (!key) {
    return
  }
  uni.setStorageSync(
    isPalt ? platKey(key) : key,
    typeof value === 'object' ? JSON.stringify(value) : value,
  )
}
