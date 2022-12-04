import React, { Component } from 'react';
import Web3 from 'web3'
 
import './App.css';
import AdsData from '../abis/AdsData.json'
import AdHome from './AdHome';

class ListPackages extends Component {

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
          const packageCount = await project.methods.packageCount().call()
          this.setState({ packageCount })
          // Load packages
          for (var i = 1; i <= packageCount; i++) {
            const packagedata = await project.methods.packages(i).call()
            this.setState({
              packages: [...this.state.packages, packagedata]
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
          packages:[],
          packageCount: 0,
          loading: true
        }
      }
      purchaseProduct(id, price) {
        //purchaseProduct(uint _id,string memory _name, uint _price,uint256 _purchasedate) 
        alert(id);
        alert(JSON.stringify(this.state.packages[id]));
        const pname=this.state.packages[id].name;
        let purchasedate = (new Date()).getTime();
        let purchasedateInUnixTimestamp = purchasedate / 1000;
      
        this.setState({ loading: true })
    this.state.project.methods.purchaseProduct(id,pname,price,purchasedate).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  render() {
    return (
      <div>
        <AdHome/>
      <div id="content" className='container-fluid justify-content-center'>
       <center>
         <h2>Package List</h2>
         <hr/>
         <div className='col-sm-2'>

         </div>
        <table className="table table-striped table-bordered  col-sm-8">
          <thead>
            <tr class="table-primary">
              <th scope="col">#</th>
              <th scope="col">PackageName</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Buy</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.state.packages.map((package1, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{package1.id.toString()}</th>
                  <td>{package1.name}</td>
                  <td>{window.web3.utils.fromWei(package1.price.toString(), 'Ether')} Eth</td>
                  <td>{package1.owner}</td>
                  <td>
                  <button
                          name={package1.id}
                          value={package1.price}
                          onClick={(event) => {
                           alert("Purchase");

                            this.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                    </td>
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

export default ListPackages;
