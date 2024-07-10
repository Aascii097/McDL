import http from '@/utils/http'
export function addcartAPI({ id, name, num, price, imgurl }) {
  const userInfo = localStorage.getItem('big-user')
  const token = JSON.parse(userInfo)?.token
  return http({
    url: `/my/addcart`,
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      id,
      name,
      num,
      price,
      imgurl
    }
  })
}
export function getcartAPI() {
  const userInfo = localStorage.getItem('big-user')
  const token = JSON.parse(userInfo)?.token
  return http({
    url: '/my/getcart',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function deletecartAPI(id) {
  const userInfo = localStorage.getItem('big-user')
  const token = JSON.parse(userInfo)?.token
  return http({
    url: '/my/deletecart',
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: { id }
  })
}
export function updatecartAPI({ id, num }) {
  const userInfo = localStorage.getItem('big-user')
  const token = JSON.parse(userInfo)?.token

  return http({
    url: '/my/updatecart',
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: { id, num }
  })
}
export function clearcartAPI() {
  return http({
    url: '/mcdl/clearcart',
    method: 'POST'
  })
}
