import http from '@/utils/http'
export function addorderAPI({ id, name, price }) {
  const userInfo = localStorage.getItem('big-user')
  const token = JSON.parse(userInfo)?.token
  return http({
    url: `/my/addorder`,
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      id,
      name,
      price
    }
  })
}
export function getorderAPI() {
  const userInfo = localStorage.getItem('big-user')
  const token = JSON.parse(userInfo)?.token
  return http({
    url: '/my/getorder',
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
