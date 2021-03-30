mkdir -p utils
mkdir -p constants

rm -rf core/
mkdir -p core/nodejs/node_modules

rm -rf dependencies/nodejs
mkdir -p dependencies/nodejs

rm -rf node_modules/utils
cp -r utils node_modules

rm -rf node_modules/constants
cp -r constants node_modules

yarn install --production  --modules-folder dependencies/nodejs/node_modules
cp -r utils core/nodejs/node_modules
cp -r constants core/nodejs/node_modules
