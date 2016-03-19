#!/usr/bin/env node
var shell = require('shelljs')
var prompt = require('prompt')
var prompts = require('./prompts')
var spinner = require('../cli-helpers/spinner')
var clientFiles = require('./clientFiles')
var chalk = require('chalk')

/**
 * Handle errors from the cli prompts.
 * @param err
 * @returns {number}
 */
function onErr(err) {
  console.log(err)
  return 1
}

/**
 * Runs the spinner for a given amount of time. Currently this isn't being used for any kind of asynchronous action
 * but rather is there to improve the UX of the CLI too. After postinstall the terminal get's flooded with a list of
 * install modules, which hides the postinstall instructions.
 * @param {number} time - How long you want the spinner to run.
 */
function preventFinishFor(time) {
  spinner.start()
  setTimeout(function () {
    spinner.stop()
  }, time)
}


/**
 * An object of strings used for inserting the start script into the user's package.json file with
 * the `shell.sed` command.
 * @type {{flag: string, insertionPoint: string, addition: string, file: string}}
 */
var insertScript = {
  flag: '-i',
  insertionPoint: '"scripts": {',
  addition: '"scripts": {\n    "start": "enclave",\n    "build": "node node_modules/enclave/src/build.js", \n    "eject": "node node_modules/enclave/src/eject/index.js",',
  file: clientFiles.package
}

/**
 * This method is really ugly and implicit, I'm sorry.
 *
 * It loops through the prompt's result object, and adds each result to a file in the user's root
 * to be referenced later.
 *
 * It also console logs the result object with this weird color library that extends the String
 * prototype to have color properties, god this is terrible.
 * @param err
 * @param {object} result
 * @returns {number}
 */
function configureConfigFile(err, result) {
  for (var key in result) {
    if (key === 'port' && !result[key] || key === 'port' && result[key] !== result[key]) {
      shell.echo('exports.' + key + ' = 8080' + '\n').toEnd(clientFiles.config)
    } else {
      shell.echo('exports.' + key + ' = ' + JSON.stringify(result[key]) + '\n').toEnd(clientFiles.config)
    }
  }
  if (err) {
    return onErr(err)
  }
  console.log(chalk.yellow('Here\'s what I\'ve got down, if something is wrong you can edit this in your enclave.js file.:'))
  console.log(chalk.red('  entry: ') + chalk.magenta(result.entry))
  console.log(chalk.red('  output: ') + chalk.magenta(result.output))
  console.log(!result.port ? chalk.red('  port: 8080') : chalk.red('  port: ') + chalk.magenta(result.port))
  console.log(chalk.red('  index: ') + chalk.magenta(result.index))
  console.log(chalk.red('  live: ') + chalk.magenta(result.live))
  console.log(chalk.green('To run your app, just type'), chalk.green.bold('$ npm start'))
  shell.sed(insertScript.flag, insertScript.insertionPoint, insertScript.addition, insertScript.file)
  preventFinishFor(5000)
}

/**
 * Start the CLI prompt.
 */
prompt.start()

/**
 * Throw down that postinstall logo.
 */
shell.exec('bash ./src/cli-helpers/postinstall-logo')

/**
 * Clean out any currently existing config file for a fresh one.
 */
shell.exec('rm ' + clientFiles.config)
shell.exec('touch ' + clientFiles.config)

/**
 * Actually executing all of this magic.
 */
prompt.get(prompts, configureConfigFile)
