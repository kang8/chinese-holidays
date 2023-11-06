## Sync holidays data and upgrade packages by annual

1. `cd data/ && git pull` to pull latest upstrem data
2. `ncu -u` to upgrade package.json first
3. `npm install` to sync package.lock
4. `npm run build && npm test` to test new data and packages
5. `git commit` via "Sync 202X holidays data and upgrade packages"
6. `git tag` via 0.0.X
7. `npm run release` to publish changes to npmjs.com
