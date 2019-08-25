import Cookies from 'js-cookie'
// token字段更改
const token = 'TOKENL'
const userId = 'idBusiness'
const photo = 'photo'

export function getToken() {
  return localStorage.getItem('token')
}

export function getUserId() {
  return Cookies.get(userId)
}

export function getPhoto() {
  return Cookies.get(photo)
}

export function setToken(tokens) {
  return localStorage.setItem('token', tokens)
}

export function setUserId(id) {
  return Cookies.set(userId, id)
}

export function setPhoto(photos) {
  return Cookies.set(photo, photos)
}

export function removeToken() {
  return Cookies.remove(token)
}

export function removeUserId() {
  return Cookies.remove(userId)
}

export function removePhoto() {
  return Cookies.remove(photo)
}

