if (!Object.fromEntries) {
  Object.fromEntries = function fromEntries (iterable: any) {
    return [...iterable].reduce((obj, [key, val]) => {
      obj[key] = val
      return obj
    }, {})
  }
}
