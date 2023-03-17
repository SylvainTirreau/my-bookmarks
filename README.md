[![fr](https://img.shields.io/badge/lang-fr-blueviolet.svg)](README.fr.md) [![0.0.1](https://img.shields.io/badge/version-0.0.1-critical.svg)](README.fr.md)

# My bookmarks

## About
A webapp to store our web bookmarks.

This a development version: don't use it, it's not yet functional.

This package build a distribution version of the webapp.

## Pre installation

Run `npm install`.

This will install all npm dependencies.

Install [Bourbon](https://www.bourbon.io/).

## Build the distribution version

### Step 1 : build package

Run `npm run build-package`.

This will create in `package` folder all javascript files from typescript ones. Those files are useful to watch and build app.

### Step 2 : install app
Run `npm run install`.

This will create basics folders and files of the app.

### Step 3 : build application

Run `npm run build-app`.

This will build application in the distribution folder. You can change distribution folder in the file [config.ts](src/config.ts) by changing the value of constant `distributionFolder`. Do it before installing application (step 1).

Then you can use application.

## Application usage

Run `node [distributionFolder]/index.js`.

This will launch a server on port 3005. Then you open app in a browser with this url : http://localhost:3005.

No documentation yet for using application.

## Application development

Later...