## Want to contribute?
Cool! We're using the following setup:
- Visual Studio Code
- Node.js 22.22.2 or newer (the development baseline in `.nvmrc`)
- npm 10.9.0 or newer
- npm workspaces install and link packages; npm scripts build them in dependency order
- Changesets manages versions, changelogs, and publishing for one fixed group of nine packages
- TypeScript 7 compiles each library into its package's `dist` directory
- esbuild 0.28.2 bundles `ste-browser` for direct script loading, with a UMD wrapper, minified variants, and source maps
- Node's built-in test runner and assertions: `npm test`
- TypeScript tests are compiled into `tmp/test` before running
- Clean build and test output: `npm run clean`

From the repository root:

Install all workspaces together using the single root `package-lock.json`:

```sh
npm ci
npm run check
```

After building, run an individual package's tests with `npm test --workspace ste-core`.
`npm run build` cleans once and builds every package in dependency order.
`npm test` only compiles and runs the tests against the built packages; it requires
an existing build. `npm run check` combines a clean build and the tests.
The `ste-browser` tests execute the built bundles in isolated browser-like contexts
to verify globals, dispatching, AMD/CommonJS loading, and source maps.

## Dependency upgrades

From the repository root:

```sh
npx npm-check-updates -u --workspaces --root --reject "@types/node,ste-*,strongly-typed-events"
npx npm-check-updates -u --workspaces --root --filter "@types/node" --target semver
npm install
npm run check
```

Changesets manages this project's own package versions, so exclude them from
dependency upgrades. Exclude `@types/node` from unrestricted latest-version
updates, then update it within its current 22.x semver range to match the Node.js
baseline. Review the manifest and root lockfile changes before committing.
These commands do not commit, push, or publish changes automatically.

## Releases

Run `npm run changeset` to describe a change that needs a release. To prepare the
release, run `npm run version-packages`; this updates package versions, internal
dependency ranges, changelogs, and the root lockfile. After reviewing and committing
the changes, `npm run release` runs the check once and publishes the unpublished versions.
Push the generated package tags with `git push --follow-tags`.

See [the release workflow](.changeset/README.md) for details, including the already
prepared `4.0.0` release.

Contributions:
1. Open an issue that describes what you would like to add / change.
1. Create a branch.
1. Create unit test(s) for the change(s).
1. Submit a pull request.
1. Contact me on <a href="https://twitter.com/KeesTalksTech">@KeesTalksTech</a> if I don't respond in time.

_Happy coding!_
