import React, { Component } from 'react';
import Web3 from 'web3'
import { format } from 'date-fns'
import './App.css';
import AdsData from '../abis/AdsData.json'
import BroadCasterHome from './BroadCasterHome';

class ListLogBroadCaster extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
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
    
      async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = AdsData.networks[networkId]
        if(networkData) {
          const project = web3.eth.Contract(AdsData.abi, networkData.address)
          this.setState({ project })
          const logCount = await project.methods.alogCount().call()
          this.setState({ logCount })
          // Load packages
          for (var i = 1; i <= logCount; i++) {
            const logdata = await project.methods.storelogs(i).call()
           // alert(logCount);
        //    /alert(JSON.stringify(logdata)); 
           this.setState({
              logdata: [...this.state.logdata, logdata]
            })
          }
          this.setState({ loading: false})
        } else {
          window.alert('Contract not deployed to detected network.')
        }
      }
    
      constructor(props) {
        super(props)
        this.state = {
          account: '',
          logdata:[],
          logCount: 0,
          loading: true
        }
      }

  render() {
    return (
      <div>
        <BroadCasterHome/>
      <div id="content" className='container-fluid justify-content-center'>
       <center>
         <h2>Log List</h2>
         <hr/>
         <div className='col-sm-2'>

         </div>
        <table className="table table-striped table-bordered  col-sm-12">
          <thead>
            <tr class="table-primary">
              <th scope="col">#</th>
              <th scope="col">PurchaseId</th>
              <th scope="col">IPFSHash</th>
              <th scope="col">Date</th>
              <th scope="col">Owner</th>
              <th scope="col">ViewProof</th>
              
              </tr>
          </thead>
          <tbody id="productList">
            { this.state.logdata.map((logdata1, key) => {
              return(
                 
                <tr key={key}>
                  <th scope="row">{logdata1.id.toString()}</th>
                  <td>{logdata1.packagepurchaseid.toString()}</td>
                  
                  <td>{logdata1.ipfsHash}</td>
                  <td>{format(logdata1.logdate*1000,'dd/MM/yyyy')}</td>
                  
                  <td>{logdata1.storelogowner}</td>
                <td >
                <button 
                style={{width:80+'px'}}
                          name={logdata1.id}
                           value={logdata1.ipfsHash} 
                          onClick={(event) => {
                           
                            
                            window.open("https://ipfs.pixura.io/ipfs/"+event.target.value);
                            }}
                        >
                         View Proof
                        </button>
                </td>
               {/* // https://ipfs.pixura.io/ipfs/QmRTprbqiEhk82LZcHYRmgcNeeeyjtRUXTN26pRAkPaMmG */}
                </tr>
              )
            })}
          </tbody>
        </table>
        </center>
        
      </div>
      </div>
    );
  }
}

export default ListLogBroadCaster;
