import { parse } from "./parser"
import { Rule } from "./types"

export type program = {
  stages: Rule[][]
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

  let stageNums: number[] = []
  for (const Rule of ast.parsed) {
    if (!stageNums.includes(Rule._stage)) {
      stageNums.push(Rule._stage)
    }
  }
  stageNums.sort((a, b) => a - b)

  let res:Rule[][] = []
  for (const s of stageNums) {
    res.push(ast.parsed.filter(a => a._stage == s))
  }
 
  return {
    stages: res
  }
}