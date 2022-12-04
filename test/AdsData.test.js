const AdsData = artifacts.require('./AdsData.sol')
 require('chai')
  .use(require('chai-as-promised'))
  .should()

// contract('AdsData', ([deployer, seller, buyer]) => {
//   let adsdata

//   before(async () => {
//     adsdata = await adsdata.deployed()
//   })

//   describe('deployment', async () => {
//     it('deploys successfully', async () => {
//       const address = await adsdata.address
//       assert.notEqual(address, 0x0)
//       assert.notEqual(address, '')
//       assert.notEqual(address, null)
//       assert.notEqual(address, undefined)
//     })

//     it('has a name', async () => {
//       const name = await adsdata.name()
//       assert.equal(name, 'Ads Play Log DApp')
//     })
//   })

//   describe('packages', async () => {
//     let result, packageCount

//     before(async () => {
//       result = await adsdata.createPackages('iPhone X', web3.utils.toWei('1', 'Ether'), { from: seller })
//       packageCount = await adsdata.packagetCount()
//     })

//     it('creates products', async () => {
//       // SUCCESS
//       assert.equal(packageCount, 1)
//       const event = result.logs[0].args
//       assert.equal(event.id.toNumber(), packageCount.toNumber(), 'id is correct')
//       assert.equal(event.name, 'AdPackage1', 'name is correct')
//       assert.equal(event.price, '120000', 'price is correct')
//       assert.equal(event.owner, seller, 'owner is correct')
//       assert.equal(event.purchased, false, 'purchased is correct')

//       // FAILURE: Product must have a name
//       await await adsdata.createPackages('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
//       // FAILURE: Product must have a price
//       await await adsdata.createPackages('AdsPackage2', 0, { from: seller }).should.be.rejected;
//     })

//     it('lists packages', async () => {
//       const package1 = await adsdata.packages(packageCount)
//       assert.equal(package1.id.toNumber(), packageCount.toNumber(), 'id is correct')
//       assert.equal(package1.name, 'Packag1', 'name is correct')
//       assert.equal(package1.price, '120000', 'price is correct')
//       assert.equal(package1.owner, seller, 'owner is correct')
//       assert.equal(package1.purchased, false, 'purchased is correct')
//     })

    // it('sells products', async () => {
    //   // Track the seller balance before purchase
    //   let oldSellerBalance
    //   oldSellerBalance = await web3.eth.getBalance(seller)
    //   oldSellerBalance = new web3.utils.BN(oldSellerBalance)

    //   // SUCCESS: Buyer makes purchase
    //   result = await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

    //   // Check logs
    //   const event = result.logs[0].args
    //   assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
    //   assert.equal(event.name, 'iPhone X', 'name is correct')
    //   assert.equal(event.price, '1000000000000000000', 'price is correct')
    //   assert.equal(event.owner, buyer, 'owner is correct')
    //   assert.equal(event.purchased, true, 'purchased is correct')

    //   // Check that seller received funds
    //   let newSellerBalance
    //   newSellerBalance = await web3.eth.getBalance(seller)
    //   newSellerBalance = new web3.utils.BN(newSellerBalance)

    //   let price
    //   price = web3.utils.toWei('1', 'Ether')
    //   price = new web3.utils.BN(price)

    //   const exepectedBalance = oldSellerBalance.add(price)

    //   assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

    //   // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
    //   await marketplace.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;      // FAILURE: Buyer tries to buy without enough ether
    //   // FAILURE: Buyer tries to buy without enough ether
    //   await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
    //   // FAILURE: Deployer tries to buy the product, i.e., product can't be purchased twice
    //   await marketplace.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    //   // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
    //   await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    // })

 // })
//})
