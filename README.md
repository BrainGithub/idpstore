```bash
cp .env.example .env
```

Edit `.env` and set `NEXT_PUBLIC_SALEOR_API_URL` to your Saleor GraphQL endpoint URL, e.g., `https://example.saleor.cloud/graphql/`.

Then, [install `pnpm`](https://pnpm.io/installation) and run the following command to install all dependencies in the repo:

```bash
pnpm i
```

To start the development server, run the following:

```bash
pnpm dev
```

The app is now running at `http://localhost:3000`.

#### GraphQL queries and mutations:

After altering or creating new GraphQL queries in `gql` folder, you need to run the following command to generate types and javascript queries:

```bash
pnpm run generate
```
