#!/usr/bin/env sh

# abort on errors
set -e

npm run build

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push --force git@github.com:gruhn/vue-qrcode-reader.git master:gh-pages

cd -
