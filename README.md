# @chen86860/autocomplete-specs

Completion specs used by
[easy-complete](https://github.com/chen86860/easy-complete).

This repository is a fork of
[withfig/autocomplete](https://github.com/withfig/autocomplete). It keeps the
completion-spec format and tooling from the original project, while publishing
the maintained specs for Easy Complete.

## Package

The package is published to npm as
[`@chen86860/autocomplete-specs`](https://www.npmjs.com/package/@chen86860/autocomplete-specs).

```bash
npm install @chen86860/autocomplete-specs
```

## What are completion specs?

A completion spec is a declarative TypeScript schema that describes the
subcommands, options, and arguments for a CLI tool. Easy Complete uses these
schemas to generate command-line suggestions.

Specs live in the `src/` directory and are compiled into `build/` before
publishing.

## Development

```bash
pnpm install
pnpm build
pnpm test
pnpm lint
```

Useful commands:

```bash
pnpm create-spec <name>
pnpm dev
pnpm lint:fix
```

## Release

When specs are released, the GitHub Actions workflow builds the specs archive,
creates a `spec-build-number-*` GitHub release, publishes the current
`@chen86860/autocomplete-specs` package to npm, and then bumps the package
version for the next release.

npm publishing uses Trusted Publishing with provenance. Configure the
`chen86860/autocomplete-specs` repository and this workflow as a trusted
publisher in the npm package settings before running the release.
