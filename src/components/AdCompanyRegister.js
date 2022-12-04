import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import AdsData from '../abis/AdsData.json'
import Navbar from './Navbar'
import Main from './Main'
import Footer from './Footer';
class AdCompanyRegister extends Component {

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
    //   const packageCount = await project.methods.packageCount().call()
    //   this.setState({ packageCount })
    //   // Load products
    //   for (var i = 1; i <= packageCount; i++) {
    //     const packagedata = await project.methods.packages(i).call()
    //     this.setState({
    //       packages: [...this.state.packages, packagedata]
    //     })
    //   }
      this.setState({ loading: false})
    } else {
      window.alert('Contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      //project:'',
      userCount: 0,
      loading: true
    }

    this.createUser = this.createUser.bind(this)
    //this.purchaseProduct = this.purchaseProduct.bind(this)
  }

  async createUser(username,password,email) {
    this.setState({ loading: true })
   // project.methods.
 await   this.state.project.methods.createUser(username,password,email).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      alert("Registered");
      window.open("/","_self");
    })
    
  }

 

  render() {
    return (
      <div>
        {/* <Navbar account={this.state.account} /> */}
<br/>
<br/>
        <div className="container-fluid col-lg-12 justify-content-center">
        <h1>Ad Company Registration</h1>
          <hr/>
          
          
        <form onSubmit={(event) => {
          event.preventDefault()
          const username = this.userName.value
          const password = this.password.value
          const email = this.email.value
          
          this.createUser(username,password,email)
        }}>
          <div className='row'>
          <div className="form-group col-sm-6">
            <input
              id="userName"
              type="text"
              ref={(input) => { this.userName = input }}
              className="form-control"
              placeholder="User Name"
              required />
          </div>
          </div>
          <div className='row'>
          
          <div className="form-group col-sm-6">
            <input
              id="password"
              type="password"
              ref={(input) => { this.password = input }}
              className="form-control"
              placeholder="password"
              required />
          </div>
          </div>
          <div className='row'>
          
          <div className="form-group col-sm-6">
            <input
              id="email"
              type="email"
              ref={(input) => { this.email = input }}
              className="form-control"
              placeholder="Email"
              required />
          </div>
          </div>
          <div className='row'>
          <div className="form-group col-sm-6">
          <button type="submit" className="btn btn-primary">Register Ad Company</button>
         </div>
          </div>
        </form>
          
        </div>
        <Footer/>
      </div>
    );
  }
}

export default AdCompanyRegister;
