import React, { Component } from 'react';
import Web3 from 'web3'
import { format } from 'date-fns'

import './App.css';
import AdsData from '../abis/AdsData.json'
import AdSerterHome from './AdSerterHome';
import {
    BrowserRouter as Router,
    
    Link
    
  } from "react-router-dom";
class ListPurchaseProductLog extends Component {

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
        if (networkData) {
            const project = web3.eth.Contract(AdsData.abi, networkData.address)
            this.setState({ project })
            const purchaseCount = await project.methods.purchaseCount().call()
            this.setState({ purchaseCount })
            // Load packages
            console.log(purchaseCount)
            for (var i = 1; i <= purchaseCount; i++) {
                const ppdata = await project.methods.packagepurchase(i).call()
                console.log(JSON.stringify(ppdata));
                this.setState({
                    purchasePackagedata: [...this.state.purchasePackagedata, ppdata]

                })
            }
            this.setState({ loading: false })
        } else {
            window.alert('Contract not deployed to detected network.')
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            purchasePackagedata: [],
            purchaseCount: 0,
            loading: true
        }
    }

    render() {
        return (
            <div >
                <AdSerterHome />
                <div id="content" className='container-fluid justify-content-center'>
                    <center>
                        <h2>Purchase List of Packages </h2>
                        <hr />
                        <div className='col-sm-2'>

                        </div>
                        <table className="table table-striped table-bordered  col-sm-8">
                            <thead>
                                <tr class="table-primary">
                                    <th scope="col">#</th>
                                    <th scope="col">PackageName</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Purchase Owner</th>
                                    <th scope="col">Purchase Date</th>
                                    <th scope="col">Add Log</th>
                                   

                                </tr>
                            </thead>
                            <tbody id="productList">
                                {this.state.purchasePackagedata.map((pdata, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{pdata.id.toString()}</th>
                                            <td>{pdata.name}</td>
                                            <td>{window.web3.utils.fromWei(pdata.price.toString(), 'Ether')} Eth</td>
                 

                                            <td>{pdata.powner}</td>
                                            <td>{format(parseInt(pdata.purdate),'dd/MM/yyyy')}</td>
                                            <td>
                  <button
                          name={pdata.id}
                          value={pdata.price}
                          onClick={(event) => {
                          // alert("Add Log"+event.value);
                            localStorage.setItem("pid",event.target.name);
                            
                            window.open("/UploadDoc","_self");
                            //this.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Add a Log
                        </button>
                          {/* <Link class="mr-2" to={`/UploadDoc/${pdata.id}`}>
                                   Add a Log

                                  </Link> */}
                    </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </center>
                </div>
 
                <footer  className="footer">
  <h4>BlockChain DApp React / Solidity </h4>
</footer>

            </div>
        );
    }
}

export default ListPurchaseProductLog;
