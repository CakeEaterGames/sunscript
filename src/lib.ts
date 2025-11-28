export function myLibrary() {

  function hi() {
    return `Hello, World!`;
  }

  function math(a: number, b: number, c: number) {
    return a * b / c;
  }

  return { hi, math }
}
