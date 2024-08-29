# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Setup

```sh
cp .env.example .env
pnpm install
```

Fill in .env with the correct values 🧙

## Development

From your terminal:

```sh
ibazel run dev
```

This starts your app in development mode, rebuilding assets on file changes.

Now you'll need to pick a host to deploy it to.

### Build

Appen bygges med GH-actions, og deployes via BUILD.bazel-filen.

```sh
bazel build :app
```