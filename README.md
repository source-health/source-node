# Source Node.js Library

The Source Node library provides access to the Source Health API from applications written in server-side JavaScript.

Our SDK is written in TypeScript and compiled to ES6.

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

By default, we'll look for credentials in the environment variables `SOURCE_API_KEY_ID` AND `SOURCE_API_KEY_SECRET`. If you'd like to capture your credentials from elsewhere, you can just pass them in:

```typescript
import { Source, ApiKey } from '@source-health/client'

const source = new Source(new ApiKey('KEY_ID', 'KEY_SECRET'))
```

And, finally, start querying the API!

```typescript
const members = await source.members.list()
```

## Signing Tokens

You can also use the Source SDK to generate tokens that can be combined with Source Elements for accessing data on behalf of your members.

```typescript
const jwt = await source.generateToken({
  member: 'member_id',
  expiration: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
})

// jwt now contains a member-scoped token that can be used with the API
```