export function getBaseUrl(): string {
  const baseUrl = process.env.BASE_URL
  if (!baseUrl) {
    throw new Error('You must define BASE_URL environment variable to run these tests')
  }
  return baseUrl
}
