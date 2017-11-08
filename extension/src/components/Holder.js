import React, { Component } from 'react';
// import './main.css';
import Input from './Input.js';
// import Select from './Select.js';
import Search from './Search.js';
// import Results from './Results.js';

class Holder extends Component{
  constructor(props){
    super(props);

    //state goes here if needed
    this.state = {
      product: '',
      department: ''
    };

    this.saveProduct = this.saveProduct.bind(this);
    this.saveDepartment = this.saveDepartment.bind(this);
  }

  saveProduct(product){
    // this.setState({product: e.target.value}, function(){
    //   console.log(this.state.product);
    // });
    this.setState({product: product},function(){
      console.log(this.state.product);
    });
  }

  saveDepartment(department){
    // this.setState({product: e.target.value}, function(){
    //   console.log(this.state.product);
    // });
    this.setState({department: department},function(){
      console.log(this.state.department);
    });
  }

  render(){
    //what will the component contain
    //lets see... we will be using bootstrap
    //get a text input that knows its value (need state)
    //maybe need a container component to lift state up to
    return (
      <div className='holding'>
        <Input onProductChange={this.saveProduct}/>

        {/* <hr/> */}

        {/* <Select onDepartmentChange={this.saveDepartment}/> */}

        <Search product={this.state.product} category={this.state.category}/>

        {/* <Results results={this.results} /> */}

      </div>
    );

  }
}

export default Holder;
