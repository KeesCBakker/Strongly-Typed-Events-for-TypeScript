# Changesets

All nine published packages belong to one fixed version group. A release bumps
the entire group to the same version and updates internal dependency ranges.
The configuration uses `master` as the base branch and publishes with public access.

For changes that require a release, run `npm run changeset` and commit the
generated Markdown file with the change. Choose a patch, minor, or major bump
and describe the change for the changelog.

To prepare a release:

Use the Node.js and npm versions described in [CONTRIBUTING.md](../CONTRIBUTING.md)
and install dependencies from the repository root with `npm ci`.

```sh
npm run version-packages
```

Review and commit the updated versions, changelogs, and root lockfile. Then run:

Publishing requires npm authentication and publish permission for all nine packages.

```sh
npm run release
git push --follow-tags
```

`npm run release` runs `npm run check` once before publishing the unpublished package
versions to npm. Changesets creates package-specific Git tags during publishing.
Versioning does not create commits, and publishing does not push tags.
The packages have no publish hooks that rebuild or rerun tests.

The migration release is already versioned as `4.0.0`. It can be published with
`npm run release` without running another version bump first.

See the [Changesets guide](https://changesets.dev/guide/getting-started).
