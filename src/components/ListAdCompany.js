import React, { Component } from 'react';
import Web3 from 'web3'
 
import './App.css';
import AdsData from '../abis/AdsData.json'
import BroadCasterHome from './BroadCasterHome';

class ListAdCompany extends Component {

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
          this.setState({ userCount })
          // Load packages
          for (var i = 1; i <= userCount; i++) {
            const udata = await project.methods.users(i).call()
            this.setState({
              users: [...this.state.users, udata]
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
          users:[],
          userCount: 0,
          loading: true
        }
      }
//       purchaseProduct(id, price) {
//     this.setState({ loading: true })
//     this.state.project.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
//     .once('receipt', (receipt) => {
//       this.setState({ loading: false })
//     })
//   }
  render() {
    return (
        <div >
<BroadCasterHome/>
       <div id="content" className='container-fluid justify-content-center'>
       <center>
         <h2>Ad Company Users List</h2>
         <hr/>
         <div className='col-sm-2'>

         </div>
        <table className="table table-striped table-bordered  col-sm-8">
          <thead>
            <tr class="table-primary">
              <th scope="col">#</th>
              <th scope="col">UserName</th>
              <th scope="col">Email</th>
              <th scope="col">Owner</th>
             
            </tr>
          </thead>
          <tbody id="productList">
            { this.state.users.map((user, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{user.id.toString()}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                   
                  <td>{user.owner}</td>
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

export default ListAdCompany;
