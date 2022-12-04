import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import AdsData from '../abis/AdsData.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

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
      // Load products
      for (var i = 1; i <= packageCount; i++) {
        const packagedata = await project.methods.packages(i).call()
        this.setState({
          packages: [...this.state.packages, packagedata]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Ads Manage contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      //project:'',
      packageCount: 0,
      packages: [],
      loading: true
    }

    this.createPackage = this.createPackage.bind(this)
    //this.purchaseProduct = this.purchaseProduct.bind(this)
  }

async  createPackage(name, price) {
    this.setState({ loading: true })
   // project.methods.
   await  this.state.project.methods.createPackages(name, price).send({ from: this.state.account })
    // .once('receipt', (receipt) => {
    // })
    this.setState({ loading: false })
    window.open("/AddPackages","_self")
  
    //this.setState({ loading: false })
   // this.setState()
  }

  // purchaseProduct(id, price) {
  //   this.setState({ loading: true })
  //   this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
  //   .once('receipt', (receipt) => {
  //     this.setState({ loading: false })
  //   })
  // }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  packages={this.state.packages}
                  createPackage={this.createPackage}
                  purchaseProduct={this.purchaseProduct} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
