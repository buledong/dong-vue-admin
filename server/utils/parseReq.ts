const isHtmlQuery = (req) => {
  const accept = req.get('Accept') || req.get('accept')
  return typeof accept === 'string' && accept.includes('text/html')
}
const isIE11 = (req) => {
  const userAgent = req.get('userAgent') || req.get('user-agent')
  return (
    typeof userAgent === 'string' &&
    userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)
  )
}

const lowVerEdge = (req) => {
  const userAgent = req.get('userAgent') || req.get('user-agent')
  const edge = userAgent.indexOf('Edge/')
  let ver,
    lowFlag = false
  if (edge > 0) {
    ver = parseInt(
      userAgent.substring(edge + 5, userAgent.indexOf('.', edge)),
      10
    )
    if (ver < 79) lowFlag = true
  }

  return lowFlag
}

const getCookie = (req, field) => {
  try {
    return req.cookies[field]
  } catch (err) {
    console.log('getCookie 出错了', err)
    return false
  }
}
export { isHtmlQuery, isIE11, getCookie, lowVerEdge }
