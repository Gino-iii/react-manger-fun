import './loading.less'
let count = 0
/* 显示loading */
export const showLoading = () => {

  if (count === 0) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'block')
  }
  count++
}
export const hideLoading = () => {
  if (count === 1) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'none')
  }
  count--
}
