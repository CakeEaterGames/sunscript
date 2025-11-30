import { isAlphaNum } from "./utils";

export function lex(input: string) {
  let res = []
  let lines = input.split('\n')
  for (let l of lines) {
    let raw = l;
    let comment = "//" //yes like that! Do not modify!
    if (l.includes(comment)) {
      l = l.substring(0, l.indexOf(comment))
    }
    let l2 = l.split(";")
    for (let l3 of l2) {
      l3 = l3.trim();
      if (!l3) continue;
      let tokens = lexLine(l3)
      res.push({ raw, tokens })
    }
  }
  return res;
}

function lexLine(input: string) {
  const reserved_chars = "=!:;+-^~>[]*#"
  const reserved = [
    "->", ...reserved_chars,
  ]
  function compareFromI(a: string, b: string, i: number) {
    return a.substring(i, i + b.length) == b
  }
  let spaces = " \t\r"
  let res = []
  let acc = ""
  mainLoop: for (let i = 0; i < input.length; i++) {
    let c = input[i];
    if (spaces.includes(c)) {
      while (spaces.includes(c)) {
        i++;
        c = input[i];
        continue;
      }
      res.push(" ")
    }

    for (const r of reserved) {
      if (compareFromI(input, r, i)) {
        res.push(r)
        i += r.length - 1;
        continue mainLoop
      }
    }

    if (c == '"') {
      let str = c
      do {
        i++;
        c = input[i];
        str += c
      } while (c != '"')
      res.push(str)
      continue
    }


    let str = c
    i++;
    c = input[i];
    while (isAlphaNum(c)) {
      str += c
      i++;
      c = input[i];
    }
    i--
    res.push(str)
  }
  if (res.length > 0 && res[res.length - 1] != ';') res.push(';')
  return res;
}
