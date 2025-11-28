import { parse, Rule } from "./parser"

export type program = {
  stages: Array<Rule[]>
}

/**
 * Compiles a plaintext SUNSCRIPT into a JSON object that can be used multiple times
 * @param input SUNSCRIPT code
 * @throws Array of Strings if the program didn't parse properly
 */
export function compile(input: string) : program {
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