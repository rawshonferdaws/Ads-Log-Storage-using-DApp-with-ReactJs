import React, { Component } from 'react';
import BroadCasterHome from './BroadCasterHome';

class Navbar extends Component {

  render() {
    return (
      // <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      // <div class="container-fluid">
      //     <a href="/" class="navbar-brand">Ads Log Project</a>
      //     <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse2">
      //         <span class="navbar-toggler-icon"></span>
      //     </button>
      //     <div class="collapse navbar-collapse" id="navbarCollapse2">
      //               <div class="navbar-nav">
      //                   <a href="/AddPackages" class="nav-item nav-link active"><h4>Add Package |</h4></a>
      //                   <a href="#" class="nav-item nav-link active"><h4>View Purchased Packages |</h4></a>
      //                   <a href="/ListAdCompany" class="nav-item nav-link active"><h4>View Ad Companys</h4></a>
                        
                      
      //               </div>
                   
      //           </div>
      //   <ul className="navbar-nav px-3">
      //     <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
      //       <small className="text-white"><span id="account"><h5>{this.props.account}</h5></span></small>
      //     </li>
      //   </ul>
      //   </div>
      // </nav>
      <div>
        <BroadCasterHome/>
      </div>
    );
  }
}

export default Navbar;
