import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" className='container-fluid justify-content-center'>
<center><h2>Add Package</h2></center>
       
        <div className="container-fluid col-lg-8 justify-content-center">
      
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.packageName.value
          const price = window.web3.utils.toWei(this.packagePrice.value.toString(), 'Ether')
          this.props.createPackage(name, price)
          this.props.packages.loading=false;
        }}>
          <div className='row justify-content-center'>
          <div className="form-group col-sm-6">
            <input
              id="packageName"
              type="text"
              ref={(input) => { this.packageName = input }}
              className="form-control"
              placeholder="Package Name"
              required />
          </div>
          </div>
          <div className='row justify-content-center'>
          <div className="form-group col-sm-6">
            <input
              id="packagePrice"
              type="text"
              ref={(input) => { this.packagePrice = input }}
              className="form-control"
              placeholder="Package Price"
              required />
          </div>
          </div>
          <div className='row justify-content-center'>
          <div className="form-group col-sm-6">
          <button type="submit" className="btn btn-primary">Add Package</button>
          </div>
          </div>
        </form>
        
        <h2>Package List</h2>
        <table  className='table table-striped table-bordered  col-sm-12'>
          <thead>
            <tr className="table-primary">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.packages.map((package1, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{package1.id.toString()}</th>
                  <td>{package1.name}</td>
                  <td>{window.web3.utils.fromWei(package1.price.toString(), 'Ether')} Eth</td>
                  <td>{package1.owner}</td>
                   
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

export default Main;
