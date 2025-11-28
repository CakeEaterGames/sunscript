(() => {
  // src/lib.ts
  function myLibrary() {
    function hi() {
      return `Hello, World!`;
    }
    function math(a, b, c) {
      return a * b / c;
    }
    return { hi, math };
  }

  // src/lib_browser.ts
  window.myLibrary = myLibrary;
})();
