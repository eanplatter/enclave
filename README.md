_NOTICE: I'm not actively working on new features for enclave. You should check out the official CLI tool for react: [create-react-app](https://github.com/facebookincubator/create-react-app)_. If you are still using enclave and want to make an issue or PR I am happy to respond and make updates :)
<p align="center">
  <img alt="enclave" src="http://i1264.photobucket.com/albums/jj488/eanplatter1/enclave-logo_zpslmhskufg.png" width="546">
</p>

<p align="center">
  A simpler way to compile React applications.
</p>
<p align="center">
  <a href='https://www.npmjs.org/package/enclave'>
    <img src="https://img.shields.io/npm/v/enclave.svg?style=flat-square" />
  </a>
  <a href='https://enclave-cli.herokuapp.com/'>
    <img src="http://enclave-cli.herokuapp.com/badge.svg" />
  </a>
  <a href='http://npm-stat.com/charts.html?package=enclave&from=2016-03-01'>
    <img src="https://img.shields.io/npm/dm/enclave.svg?style=flat-square" />
  </a>
  <a href='./LICENSE.md'>
    <img src="http://img.shields.io/:license-mit-blue.svg?style=flat-square" />
  </a>
  <a href='https://travis-ci.org/eanplatter/enclave'>
    <img src="https://travis-ci.org/eanplatter/enclave.svg?branch=master" />
  </a>
</p>

## What is this?
An npm module which handles compiling your JSX and ES2015 code into browser-ready JavaScript.

## Why do I want this?
If you've ever had to make a React app from scratch, you know it can be rough to set up. Enclave removes the set up so you can focus on what's important, building your app.

## Who is this for?
Primarily for those who don't want to go through the hassle of setting up a React project but who still want to flexibility that a starter kit can't provide.

## Ok, but what if my app outgrows enclave?
If you find for whatever reason that enclave's management of your webpack and babel dependencies is not offering enough customization for you, merely run:
```
$ npm run enclave-eject
```

The `enclave-eject` command transfers enclave's webpack configuration files to your app's root, and installs the dependencies you need in your app for you.

After executing the eject command, `$ npm run serve` will compile and serve your code, just like before, sans enclave.


## Philosophy
This project comes from a combination of two things, a complexity of configuring React applications with Webpack and Babel (especially for beginners), and my experience with compile-to-JavaScript languages, like Elm or CoffeeScript.

I thought it would be nice to be able to write JSX and ES* the same way I wrote Elm. Just do it, and let some magic happen behind the scenes to make it browser compatible.

Enclave was created with this approach in mind.

What I would like to do is eventually level enclave to the point where it maintains a sane API but is less reliant on Webpack, maybe even have it do the compiling as well.

All in all, this is open experimentation. Hopefully if you're wanting to get started with React you'll find Enclave is a helpful tool to get you up and running quickly.

## Getting Started:
### Short Version:
```
$ npm i enclave -S
$ npm run enclave-serve
```

### Long version
```
$ mkdir my-new-app
$ cd my-new-app
$ npm init
$ npm install enclave --save
```

Enclave will then take you through a series of prompts. The answers to these prompts will create a `enclave.js` file in your application's root. This file is what enclave uses to reference your build. If you need to change any of your settings, you can do that directly in the `enclave.js` file.

Create an entry point for your application:
```
$ mkdir src && touch src/App.js src/index.html
```
Now you'll be able to write some crazy JSX and ES2015 code like this:
``` js
/* src/App.js */

import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Welcome to my app!
        </h1>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```

Configure your `index.html` file to have something with the id your react app is looking to hook into ("root" in this case)
``` html
<!-- src/index.html -->
<html>
<head>
  <title>my app</title>
</head>
<body>
  <div id='root'></div>
</body>
</html>
```
> _Also, this is where you would do things like hook in a cdn or google fonts or whatevs._

Enclave will _automagically_ add a script to your `package.json` file which will allow you to run everything.
To run it, type the following in your terminal:
```
$ npm run enclave-serve
```
> _If you want to edit your scripts, you can just move the start command somewhere else._

Then find your app at `http://localhost:8080`
> _If you set your port to something other than 8080, then go there instead!_.

## Currently supported settings

When enclave is installed in your project, it creates an `enclave.js` file. This is where your settings are stored. Currently supported settings are:
  - entry: {string} The relative path of your entry file, it tells Webpack where to start compiling. Ex. "src/App.js"
  - output: {string} The relative path and name of the directory you want Webpack to spit your compiled code into. Ex. "dist"
  - port: {number} The port where you want your app to run. Ex. 3000
  - index: {string} The relative path of your `index.html` file. Ex. "src/index.html"
  - live: {boolean} Whether you want live-reload or not. Takes in "t", "f", "true", or "false"

After your complete enclave's prompts, you'll find a `enclave.js` file in your app. If you need to edit any of the answers you gave you can do that here. It should look something like this:

```js
/* enclave.js */
exports.entry = "src/App.js"
exports.output = "dist"
exports.port = 3000
exports.index = "src/index.html"
exports.live = true
```

## Contributing

[See the Contributing Guide](./CONTRIBUTING.md)

[Learn how Enclave works](./WALKTHROUGH.md)

## License

[MIT](./LICENSE.md)
