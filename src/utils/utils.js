export function down(url) {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  // link.setAttribute('download', url)

  document.body.appendChild(link)
  link.click()
  // 释放URL对象所占资源
  window.URL.revokeObjectURL(url)
  // 用完即删
  document.body.removeChild(link)
}
