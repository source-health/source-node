/**
 * The types for the below package exist but are incorrect. They don't include the available `shim()` method on the main export which
 * is what you should be calling to actually polyfill the missing function
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const fromEntries = require('object.fromentries')

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!Object.fromEntries) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  Object.fromEntries = fromEntries.shim()
}
