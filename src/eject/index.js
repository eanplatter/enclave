var shell = require('shelljs')
var requiredDependencies = require('./requiredDependencies')

var WEBPACK_DEV_CONFIG = './node_modules/enclave/webpack.config.js'
var WEBPACK_PROD_CONFIG = './node_modules/enclave/webpack.config.build.js'

var concatenatedDependencies = requiredDependencies.reduce(function (a, b) {
  return a + ' ' + b
})

shell.exec('npm i -S ' + concatenatedDependencies, {silent: true})

var routeAdjustments = {
  flag: '-i',
  insertionPoint: 'var settings = require(\'../../enclave.js\')',
  addition: 'var settings = require(\'./enclave.js\')',
  files: [WEBPACK_DEV_CONFIG, WEBPACK_PROD_CONFIG]
}

shell.sed(
  routeAdjustments.flag,
  routeAdjustments.insertionPoint,
  routeAdjustments.addition,
  routeAdjustments.files
)


shell.mv(WEBPACK_DEV_CONFIG, './webpack.config.js')
shell.mv(WEBPACK_PROD_CONFIG, './webpack.config.build.js')
