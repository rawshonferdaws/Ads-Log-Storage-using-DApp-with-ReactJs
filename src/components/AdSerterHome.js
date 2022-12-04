import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import AdsData from '../abis/AdsData.json'
import Navbar from './Navbar'
import Main from './Main'
import Footer from './Footer';

class AdSerterHome extends Component {
   
   
    render() {
        return (
   <div>                 
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a href="/" class="navbar-brand">Ads Log Project</a>
                <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse2">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse2">
                    <div class="navbar-nav">
                        <a href="/ListPurchaseProductLog" class="nav-item nav-link active"><h4>View Purchased Packages |</h4></a>
                        
                        <a href="/ListLog" class="nav-item nav-link active"><h4>View Logs |</h4></a>
                        
                        <small className="text-white"><span id="account"><h5>{this.props.account}</h5></span></small>
                    </div>
                   
                </div>
            </div>        
        </nav>
<Footer/>
</div>          
                
            );
    }

}
export default AdSerterHome;