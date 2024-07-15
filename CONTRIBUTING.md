Your contributions are welcome.
Don't hesitate to open an issue if you have trouble.

### Setup Dev Environment

Canonically this package uses Node 18 and `pnpm` as a package manager.
If you are a [Nix](https://nixos.org/) user, there is a `flake.nix` file in the project root.

Clone the repository and run

```
pnpm install
```

We use a locally served version of the [demo page](https://gruhn.github.io/vue-qrcode-reader/) during development.
To get that started run

```
npm run docs:dev
```

### Commit Messages

The version number of releases is automatically determined form commit messages.
This only works if we follow [Angular Commit Message Conventions](https://github.com/semantic-release/semantic-release#commit-message-format).
