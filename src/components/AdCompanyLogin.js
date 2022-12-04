import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import AdsData from '../abis/AdsData.json'
import Navbar from './Navbar'
import Main from './Main'
import Footer from './Footer';
 //import { useNavigation } from 'react-navigation';
//import { useNavigation } from '@react-navigation/native';
class AdCompanyLogin extends Component {

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
      const userCount = await project.methods.userCount().call()
     // this.setState({ packageCount })
      // Load products
    //  project.methods.adcompanyusers("first@gmail.com").call().forEach(element => {
    console.log("Data ");    
    //const data=await project.methods.adcompanyusers("second@gmail.com").call();
    //console.log(JSON.stringify(data))
     // }); 
      //(var i = 1; i <= userCount; i++) {
        //const packagedata = await project.methods.adcompanyusers()
        // this.setState({
        //   packages: [...this.state.packages, packagedata]
        // })
        //console.log(JSON.stringify(packagedata))
      //}
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

    this.CheckLogin = this.CheckLogin.bind(this)
    //this.purchaseProduct = this.purchaseProduct.bind(this)
  }

  async  CheckLogin(email,password) {
    this.setState({ loading: true })
   // project.methods.packages(i).call()
   alert(email + " "+ password);
   const userCount = await this.state.project.methods.userCount().call()
   alert(userCount)
   const res= await  this.state.project.methods.adcompanyusers("first@gmail.com").call();
   alert(JSON.stringify(res));

   //    .once('receipt', (receipt) => {
        if (res.password === password) {
            localStorage.setItem("email", email);
            localStorage.setItem("account", this.state.account);
            alert("Welcome");
            console.log(this.props.history);
            window.open("/AdHome","_self");
            //this.props.history.push("/AdHome");
           //  this.props.navigation.navigate('/AdHome')
           // navigate("/Home");
          } else {
            alert("wrong user credentials or please signup");
          }
 this.setState({ loading: false })
  //  })
  }

  
  render() {
    return (
   
<div class="container-fluid col-md-12 border  mt-4">
<section class="vh-80 mt-4">
  <div class="container-fluid">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image" />
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <form onSubmit={(event) => {
          event.preventDefault()
          const password = this.password.value
          const email = this.email.value
          
          this.CheckLogin(email,password)
        }}>
          <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p class="lead fw-normal mb-0 me-3"><b>Ad Company Login</b></p>
            
          </div>

          
         <br/>
          <div class="form-outline mb-4">
          <input
              id="email"
              type="email"
              ref={(input) => { this.email = input }}
              className="form-control form-control-lg"
              placeholder="Email"
              required />
            
            {/* <label class="form-label" for="email">Email address</label> */}
          </div>
 
          <div class="form-outline mb-3">
          <input
              id="password"
              type="password"
              ref={(input) => { this.password = input }}
              className="form-control form-control-lg"
              placeholder="password"
              required />
            
            {/* <label class="form-label" for="password">Password</label> */}
          </div>

        

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg"
             >Login</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/AdCompanyRegister"
                class="link-danger">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  
</section>
<Footer/>
  </div>
    );
  }
}

export default AdCompanyLogin;
