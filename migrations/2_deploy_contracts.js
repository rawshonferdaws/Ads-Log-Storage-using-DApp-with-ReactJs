
const AdsData = artifacts.require("AdsData");
const Contract = artifacts.require("Contract");

module.exports = function(deployer) {
  deployer.deploy(AdsData);
  deployer.deploy(Contract);
  
 };