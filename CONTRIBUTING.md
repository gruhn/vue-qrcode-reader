# Contributing

All contributions are welcome. If you wish to contribute code, make sure

 * your editor has [editorconfig](http://editorconfig.org/) installed.
 * to follow [Vues official style guide](https://vuejs.org/v2/style-guide/).
 * to use [BEM](http://getbem.com/) naming convention for CSS classes.

:point_right: If you have any questions or you're struggeling to get things going, don't hesitate to open an issue.

### Setup locally
First install [yarn](https://yarnpkg.com/en/docs/install) if you haven't already.

Navigate to your workspace and clone this respository:
```
git clone git@github.com:gruhn/vue-qrcode-reader.git
```

Install dependencies and symlink the package for development:
```
cd vue-qrcode-reader
yarn install
yarn link
```

Create a fresh Vue project somewhere else or navigate to an existing one so you can test whichever changes you'll make. The easiest way is probably to clone the [demo project](https://gruhn.github.io/vue-qrcode-reader/) for that:
```
git clone -b gh-pages git@github.com:gruhn/vue-qrcode-reader.git vue-qrcode-reader-demo
```

If you choose to use the demo project, `cd` inside and install dependencies. Note, the actual Vue project is in the subfolder `dev/`:
```
cd vue-qrcode-reader-demo/dev
yarn install
```

Now, link your development version of the package in your testing project:
```
# in vue-qrcode-reader-demo/dev
yarn link vue-qrcode-reader
```

Finally, start a development server for both projects and start coding!
```
# in vue-qrcode-reader/
yarn run dev

# in vue-qrcode-reader-demo/dev
yarn run dev
```
