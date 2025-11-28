import { parse } from "./parser"
import { Rule } from "./types"

export type program = {
  stages: Array<Rule[]>
}

/**
 * Compiles a plaintext SUNSCRIPT into a JSON object that can be used multiple times
 * @param input SUNSCRIPT code
 * @throws Array of Strings if the program didn't parse properly
 */
export function compile(input: string): program {

  //Not much to compile tbh
  //There might be more stuff here in the future but for now, 
  //That's it!
  //All the juice is in the parser

  let ast = parse(input)
  if (ast.errors.length > 0) throw ast.errors
  let p = ast.parsed.filter(a => !a.pp)
  let pp = ast.parsed.filter(a => a.pp)
  return {
    stages: [
      p, pp,
    ]
  }
}