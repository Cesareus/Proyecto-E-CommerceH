/* eslint-disable no-undef */
const ajax = (url, data) => {
  const ajax = $.ajax({
    method: 'POST',
    url,
    data,
    processData: false,
    contentType: false
  })
  return ajax
}
export const URL = '.'
export const services = {
  ajax
}
