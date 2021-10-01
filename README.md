# Source Node.js Library

The Source Node library provides access to the Source Health API from applications written in server-side JavaScript.

Our SDK is written in TypeScript and compiled to ES6.

## Getting Started

Getting started with the Source Health client is easy. First, install the package via NPM:

```bash
yarn add @source-health/client # or npm install @source-health/client
```

Then, create an instance of the client using an API key.

```typescript
import { Source, ApiKey } from '@source-health/client'

const source = new Source(new ApiKey('YOUR_KEY'))
```

And, finally, start querying the API!

```typescript
const members = await source.members.list()
```