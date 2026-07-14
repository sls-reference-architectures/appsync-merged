# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm test                  # lint + unit tests
npm run lint               # ESLint check
npm run lint:fix           # ESLint auto-fix
npm run test:unit          # unit tests only
npm run test:int           # schema breaking-change check (jest.config.int.js)
npm run test:users:e2e     # e2e against the deployed Users API
npm run test:orders:e2e    # e2e against the deployed Orders API
npm run test:merged:e2e    # e2e against the deployed Merged API
npm run deploy             # deploy (config selected via --config; see below)
npm run teardown:merged    # remove the Merged API stack
npm run teardown:users     # remove the Users API stack
npm run teardown:orders    # remove the Orders API stack
```

There is no single `deploy`/`teardown` target — each of the three stacks below has its own
Serverless config, deployed and torn down independently via `--config`.

## Architecture

Demonstrates AWS AppSync's `Merged` API type — the minimum CloudFormation needed to compose two
independent "source" AppSync APIs into one federated "merged" API, since `serverless-appsync-plugin`
doesn't support `Merged` natively. Loosely follows the pattern from
[this AWS tutorial](https://youtu.be/LP8n5bYuiPA).

**Three independent stacks, deployed in dependency order** (Users and Orders in parallel, then
Merged — see `.github/workflows/ci.yml`):

- **`serverless.users.yml`** (`users-source`) — source AppSync API, API_KEY auth, Lambda data
  sources for `users/handlers.js` (list/get/create), schema in `users/schema.api.graphql`, backed
  by a `UsersTable`.
- **`serverless.orders.yml`** (`orders-source`) — same shape as Users, for `orders/handlers.js` and
  `orders/schema.api.graphql`, backed by an `OrdersTable`.
- **`serverless.merged.yml`** (`appsync-merged`) — the `MERGED`-type `AWS::AppSync::GraphQLApi`.
  Has no schema or resolvers of its own; instead it defines a `MergedApiExecutionRole` (granted
  `appsync:SourceGraphQL` on both source APIs and `appsync:StartSchemaMerge`) plus two
  `AWS::AppSync::SourceApiAssociation` resources (`OrdersApiAssociation`, `UsersApiAssociation`,
  `MergeType: AUTO_MERGE`) that pull in the Users and Orders schemas at deploy time. Reads both
  source stacks' `ApiId` outputs via cross-stack `${cf:users-source-dev.ApiId}` /
  `${cf:orders-source-dev.ApiId}` references — Users and Orders must be deployed first.
  `apiKeyExpiry.js` computes the merged API key's `Expires` timestamp (300 days out) as a
  Serverless `${file(...)}` variable.

**Test dirs mirror the stacks**: `users/test/`, `orders/test/`, `merged/test/` each hold their own
`*.e2e.test.js`, run against their own stack via the matching `test:*:e2e` script. `common/`
(`jest.setup.js`, `testHelpers.js`) holds shared e2e setup/helpers used across all three.

**`*/schema.int.test.js`** (one per source API) is not a live-infrastructure check — it diffs the
current `schema.api.graphql` against the version at `git show HEAD~1`, using
`@graphql-inspector/core`, and fails on breaking changes. It's deliberately git-based rather than
introspecting a live AppSync API, because CI tears down every stack at the end of each run, so
there's never a previously-deployed API left to compare against. Needs `fetch-depth: 2` on
checkout (already set in `ci.yml`) so `HEAD~1` is available.

**Teardown order matters, in reverse of deploy**: Merged must be torn down before Users/Orders,
since its `SourceApiAssociation`s reference both source APIs.

`compare-role.yml` (repo root) is a standalone IAM policy snippet, not wired into any of the three
`serverless.*.yml` configs or referenced elsewhere — appears to be scratch/reference material, not
active infrastructure.

## Known constraints

- `osls` (community fork) is the deploy tool, not the official `serverless` package.
- No unified `deploy`/`test:e2e` script exists by design — always target a specific stack's config.
