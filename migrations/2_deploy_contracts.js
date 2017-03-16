var ConvertLib = artifacts.require('./ConvertLib.sol')
var DigitalAssets = artifacts.require('./DigitalAssets.sol')

module.exports = function (deployer) {
  deployer.deploy(ConvertLib)
  deployer.link(ConvertLib, DigitalAssets)
  deployer.deploy(DigitalAssets)
}
