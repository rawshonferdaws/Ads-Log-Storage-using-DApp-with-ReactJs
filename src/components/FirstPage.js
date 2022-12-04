import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import AdsData from '../abis/AdsData.json'
import Navbar from './Navbar'
import Main from './Main'
import AdSerterHome from './AdSerterHome';
import  Footer  from './Footer';
class FirstPage extends Component {
    render() {
        return (
            <div>
         


  
<div className="container text-center">    
  <h3>Ads Security Log File and Package Purchase </h3><br/>
    <hr/>
<div className='row justify-content-center'>
 
  <div class="card" style={{width:200+'px'}}>
    <img class="card-img-top" src="images/adimage2.jfif" alt="Card image" style={{width:100+"%"}}/>
    <div class="card-body">
      <h4 class="card-title"></h4>
      <p class="card-text">
      <h4 class="card-title">Advertising Company</h4>
       
        <ul className='text-left' >
            <li>Register</li>
            <li>Login</li>
            <li>Purchase Packages</li>
            <li>Check the Confirmation</li>
        </ul>
        </p>
      <a href="/AdCompanyLogin" class="btn btn-outline-primary">Ad Company</a>
    </div>
  </div>
  <br/>
  <div class="card" style={{width:200+'px'}}>
  <img class="card-img-top" src="images/broadimage.jfif" height="132px" alt="Card image" style={{width:100+"%"}} />

    <div class="card-body">
    <h4 class="card-title"></h4>
      <p class="card-text">
      <h4 class="card-title">BroadCaster</h4>
   
      <ul className='text-left' >
            <li>Add Adv. Package</li>
            <li>View Ad Company</li>
            <li>View Purchases Details</li>
            <li>Check the Confirmation</li>
        </ul>
        </p>
            <a href="/BroadCasterHome" class="btn btn-outline-primary">BroadCaster Desk</a>
    </div>
  </div>
  
  <div class="card" style={{width:200+'px'}}>
  <img class="card-img-top" src="images/adimage.png" alt="Card image" height="132px" style={{width:100+"%"}} />

    <div class="card-body">
    <h4 class="card-title"></h4>
      <p class="card-text">
      <h4 class="card-title">Ad Serter</h4>
   
      <ul className='text-left' >
            <li>View Purchase List</li>
            <li>Add Logs</li>
            <li>View Logs</li>
            
        </ul>
        
        </p>
        <br/>
      <a href="/AdSerterHome"  class="btn btn-outline-primary">Add Logs</a>
    </div>
  </div>
</div>


</div>
 
<Footer/>

</div>

            );
        }
}
export default FirstPage;