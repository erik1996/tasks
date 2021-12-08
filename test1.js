function fn(str) {
    const strArr = [str];
    const obj = {
        fn: s => {
          if (!s) {
              return strArr.join(' ');
          }
          strArr.push(s);
          return obj;
        }
    };

    return obj;
}

console.log(
    fn("hello").fn("world").fn("!!!").fn()
)

console.log(
    fn("This").fn("is").fn("just").fn("a").fn("test").fn()
)
