try! [resty.js](https://github.com/restyjs/resty), my newest node.js + koa based framework. with controllers and middlewares built in.

# nodejs-boilerplate

Clean Architecture for node.js projects

## Folder Structure

```
src
│   main.ts         # Application entry point
└───config          # Environment variables and configurations
└───lib             # Split the startup process into modules
└───middleware      # Koa middleware  TypeORM Entities
└───modules         # All the business modules is here
   └───auth
      └───controller
      └───router
      └───service
   └───user
      └───controller
      └───router
      └───service
└───types           # Type declaration files (d.ts) for Typescript

```

## Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

### Install

- Install all dependencies with `yarn install`

### Running in dev mode

- Run `yarn start`
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- Run `yarn build` to generated all JavaScript files from the TypeScript sources.
- the builded app located in `dist`.

Inspired by Bulletproof Node.js architecture with modificatins
