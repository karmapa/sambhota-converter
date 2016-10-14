#!/bin/bash

ELECTRON_VERSION=1.3.4
FOLDER_ID=0B9GraSYa0W12cjJFNF
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | xargs)
ZIP_IOS="sambotha-converter-darwin-x64-v${PACKAGE_VERSION}.zip"
ZIP_WIN="sambotha-converter-win32-x64-v${PACKAGE_VERSION}.zip"

rm -rf dist
webpack
cp -r package.json main.js dist/
cd dist
sed -i '' 's/http:\/\/localhost:8080/\./g' index.html

electron-packager . sambotha-converter-v0.0.1 --platform=darwin,win32 --arch=x64 --overwrite
