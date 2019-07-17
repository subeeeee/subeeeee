export const set = (key, data) => {
  try {
    localStorage.setItem(key, data)
  } catch (e) {}
}

export const get = key => {
  try {
    localStorage.getItem(key)
  } catch (e) {}
}

export const loadAppStorage = key => {
  let data
  try {
    data = JSON.parse(get(key))
  } catch (e) {}
  if (!data) {
    return false
  } else {
    return data
  }
}

export const updateAppStorage = (key, data) => {
  data = typeof data !== 'string' ? JSON.stringify(data) : data
  set(key, data)
}
