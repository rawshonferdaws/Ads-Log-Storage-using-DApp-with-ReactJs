import React, { Component } from 'react';
//import logo from ‘./logo.svg’;
import './App.css';
import Web3 from 'web3'
import ipfs from './ipfs';
import AdsData from '../abis/AdsData.json'
import {     useParams } from "react-router-dom";
//import { useLocation,useNavigate } from "react-router-dom";
import queryString from 'query-string'
import Footer from './Footer';
import AdSerterHome from './AdSerterHome';

class UploadDoc extends Component {
  
  async componentWillMount() {
        await this.loadWeb3()
    //    await this.loadBlockchainData()
    }
   
    
    async loadWeb3() {
       
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    constructor(props) {
      super(props);
      this.state = {
        ipfsHash:null,
        buffer:'',
        ethAddress:'',
        blockNumber:'',
        transactionHash:'',
        gasUsed:'',
        txReceipt: '' ,
        purchaseid:0  
      };
     this.state.purchaseid= localStorage.getItem("pid");
    //alert(this.state.purchaseid);
    }
    


captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };
 convertToBuffer = async(reader) => {
      //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };
onClick = async () => {
try{
    const web3 = window.web3
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt
        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClick
onSubmit = async (event) => {
      event.preventDefault();
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const networkId = await web3.eth.net.getId()
      const networkData = AdsData.networks[networkId]
      if(networkData) {
        const project = web3.eth.Contract(AdsData.abi, networkData.address)
        this.setState({ project })
         
         }
      
      console.log('Sending from Metamask account: ' + accounts[0]);
       const ethAddress= networkData.address; //await AdsData.options.address;
      this.setState({ethAddress});
    //   alert(this.state.buffer);
    //  alert(ipfs);
    console.log(ipfs);

    
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
       // alert(ipfsHash);
        //alert(err);
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash 
        this.setState({ ipfsHash:ipfsHash[0].hash });
   // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
  //return the transaction hash from the ethereum contract
 //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
 
 this.setState({ loading: true })
 //let purchaseid=1;
 let logdate = (new Date()).getTime();
 let logdateInUnixTimestamp = logdate / 1000;
console.log(logdate);
console.log(this.state.ipfsHash);
 this.state.project.methods.createLog(this.state.purchaseid,this.state.ipfsHash,logdate).send({ from: this.state.account })
 .once('receipt', (receipt) => {
   this.setState({ loading: false })
 //  this.setState({transactionHash});
     
  })
//         AdsData.methods.sendHash(this.state.ipfsHash).send({
//           from: accounts[0] 
//         }, (error, transactionHash) => {
//           console.log(transactionHash);
//           this.setState({transactionHash});
//         }); //storehash 
      }) //await ipfs.add 
    }; //onSubmit
render() {
      
      return (
        <div id="content" className='container-fluid justify-content-center'>
              <AdSerterHome/>
                 <div className="container-fluid col-lg-12 justify-content-center">
              
        {/* <div className="App"> */}
          <center>
            <h1> Upload Proof for Channeled Advertisements </h1>
            </center>
          
          <hr />
          <div className='row justify-content-center'>
          
          <form onSubmit={this.onSubmit}>
          <div className='row'>
          <div className="form-group col-sm-6">
         
          <label>Select File</label>
         
            <input  className='form-group'  type = "file"  onChange = {this.captureFile}    />
          </div>
          </div>
          <div className='row'>
          
            <div className="form-group col-sm-6">
       
             <button className='btn btn-primary btn-md'  bsStyle="primary" type="submit"> 
             Submit
             </button>
          </div>
          </div>
          </form>
          </div>
<hr/>
 <button className="btn btn-primary btn-lg" onClick = {this.onClick}> Display Proof </button>
  <table bordered responsive>
                <thead>
                  <tr>
                    <th>Tx Receipt</th>
                    <th>Values</th>
                  </tr>
                </thead>
               
                <tbody>
                  {/* <tr>
                    <td>IPFS Hash # stored on Eth Contract</td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr> */}
                  <tr>
                    <td>Hash Received </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>
                  {/* <tr>
                    <td>Block Number # </td>
                    <td>{this.state.blockNumber}</td>
                  </tr>
                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr> */}
                
                </tbody>
            </table>
        <Footer/>
     </div>
     </div>
      );
    } //render
} //App
export default UploadDoc;