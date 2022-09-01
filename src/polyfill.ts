// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!Object.fromEntries) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.fromEntries = function fromEntries(iterable: unknown[][]) {
    return [...iterable].reduce((obj, [key, val]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      obj[key] = val
      return obj
    }, {})
  }
}
