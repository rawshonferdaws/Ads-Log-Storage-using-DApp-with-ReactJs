//using the infura.io node, otherwise ipfs requires you to run a //daemon on your own computer/server.
// const IPFS = require('ipfs-api');
// const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
//run with local daemon

const ipfsApi = require('ipfs-api');
const ipfs = new ipfsApi('localhost', '5001', {protocol:'http'});
console.log("IPFS")
console.log(ipfs)
export default ipfs;


// var ipfsAPI = require('ipfs-api')
 
// // connect to ipfs daemon API server
// //var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values
 
// // or connect with multiaddr
// var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')
 
// // or using options
// //var ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})
 
// // or specifying a specific API path
// //var ipfs = ipfsAPI({host: '1.1.1.1', port: '80', 'api-path': '/ipfs/api/v0'})
// console.log(ipfs);
// export default ipfs;




// // const { create } = require('ipfs-http-client');
// // const ipfs = create({host: 'localhost', port: 5001, protocol: 'http'});

// // export default ipfs;
