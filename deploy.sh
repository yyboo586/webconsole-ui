#!/bin/bash

set -ex

echo "Deploying webconsole-ui ..."
git fetch && git reset --hard origin/master
npm run build
cp -r ./dist/* /home/www/