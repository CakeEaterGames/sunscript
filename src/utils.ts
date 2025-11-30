export function isAlphaNum(str:string) {
  if (str === undefined) return false
  for (let i = 0; i < str.length; i++) {
      const code = str[i].charCodeAt(0);
      let r = false
          || (code >= 48 && code <= 57)   // 0-9
          || (code >= 65 && code <= 90)   // A-Z
          || (code >= 97 && code <= 122)  // a-z
          || "_".includes(str[i])
      if (!r) return false
  }
  return true
}


export function isNum(str:string) {
  return isNaN(Number(str))
}
