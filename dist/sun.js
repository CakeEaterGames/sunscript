function(context,args) { // {import:true} 
  function hi() {
    return `Hello, World!`;
  }
  function math(a, b, c) {
    return a * b / c;
  }
  return { hi, math };
}