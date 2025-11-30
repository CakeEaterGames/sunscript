import { parse } from "./parser"
import { CMD, Program, Rule } from "./types"


/**
 * Compiles a plaintext SUNSCRIPT into a JSON object that can be used multiple times
 * @param input SUNSCRIPT code
 * @throws Array of Strings if the program didn't parse properly
 */
export function compile(input: string): Program {

  //Not much to compile tbh
  //There might be more stuff here in the future but for now, 
  //That's it!
  //All the juice is in the parser

  let ast = parse(input)
  if (ast.errors.length > 0) throw ast.errors

  let res: Program = { stages: [] }
  let stage: CMD[] = []
  for (let i = 0; i < ast.parsed.length; i++) {
    const cmd = ast.parsed[i];

    if (cmd.type == "stage") {
      res.stages.push(stage)
      stage = []
    } else {
      stage.push(cmd)
    }

    if (i == ast.parsed.length - 1) {
      res.stages.push(stage)
    }
  }

  return res
}