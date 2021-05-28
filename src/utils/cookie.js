/**
 * 删除同域名下所有cookie
 */
export const deleteDomainCookies = () => {
  var c = document.cookie.split('; ')
  for (var i in c)
    document.cookie =
      /^[^=]+/.exec(c[i])[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

const GetCookieVal = offset => {
  var endstr = document.cookie.indexOf(';', offset)
  if (endstr === -1) endstr = document.cookie.length
  return unescape(document.cookie.substring(offset, endstr))
}
export const GetCookie = name => {
  var arg = name + '='
  var alen = arg.length
  var clen = document.cookie.length
  var i = 0
  while (i < clen) {
    var j = i + alen
    if (document.cookie.substring(i, j) === arg) return GetCookieVal(j)
    i = document.cookie.indexOf(' ', i) + 1
    if (i === 0) break
  }
  return null
}
export const DeleteCookie = name => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = GetCookie(name)
  document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString()
}

export const getCookie = cookieName => {
  var allCookies = document.cookie
  var cookiePos = allCookies.indexOf(cookieName)
  if (cookiePos !== -1) {
    cookiePos += cookieName.length + 1
    var cookieEnd = allCookies.indexOf(';', cookiePos)
    if (cookieEnd === -1) {
      cookieEnd = allCookies.length
    }
    var value = unescape(allCookies.substring(cookiePos, cookieEnd))
  }
  return value
}
