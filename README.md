# Source Node.js Library

| :bangbang: | This SDK is still in beta, and may change significantly before its public release. |
| :--------: | :--------------------------------------------------------------------------------- |

The Source Node library provides access to the Source Health API from applications written in server-side
JavaScript/TypeScript.

Our SDK is written in TypeScript and compiled to ES6.

## Known Limitations

This is an early releaes of our TypeScript SDK, and it comes with some known limitations:

- Does not currently support file uploads to Source (see [below](#file-uploads)).
- Some types may be defined as `unknown` as we improve our type generation

## Getting Started

Getting started with the Source Health client is easy. First, install the package via NPM:

```bash
yarn add @source-health/client # or npm install @source-health/client
```

Then, create an instance of the client:

```typescript
import { Source } from '@source-health/client'

const source = new Source()
```

By default, we'll look for credentials in the environment variables `SOURCE_API_KEY_ID` AND `SOURCE_API_KEY_SECRET`. If
you'd like to capture your credentials from elsewhere, you can just pass them in:

```typescript
import { Source, ApiKeyAuthentication } from '@source-health/client'

const source = new Source(new ApiKeyAuthentication('KEY_ID', 'KEY_SECRET'))
```

And, finally, start querying the API!

```typescript
const members = await source.members.list()
```

## Signing Member Tokens

You can also use the Source SDK to generate tokens that can be combined with Source Elements or your own frontend
application for accessing data on behalf of your members. This token must be created by your own backend application,
since it requires the secret API key. Read more about member tokens in the
[Source API documentation](https://docs.sourcehealth.com/docs/api/authentication/).

```typescript
const jwt = await source.tokens.generate({
  subject: 'mem_123',
  expiration: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
})

// jwt now contains a member-scoped token that can be used with the API as a bearer token.
```

To create a member token for an authorized member that has a
[relationship](https://docs.sourcehealth.com/docs/api/reference/relationship/) with another member, put the authorized
member's ID in the `actor` field:

```typescript
const jwt = await source.tokens.generate({
  subject: 'mem_123',
  actor: 'mem_456',
  expiration: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
})
```

## File Uploads

The generated SDK client code for file uploads does not use a 'multipart/form-data' content type which the API requires, thus the `source.files.create()` SDK method will always fail.

As a workaround, you can use the lower-level `request()` method in the client SDK to upload a form using the `form-data` NPM package.

```typescript
import * as FormData from 'form-data'

const filename = './image.png'
const formData = new FormData()
const fileStream = createReadStream(filename)
formData.append('file', fileStream, 'image.png')
formData.append('purpose', 'photo')
const response = await client.request('POST', '/v1/files', {
  data: formData,
  contentType: 'multipart',
})
```
