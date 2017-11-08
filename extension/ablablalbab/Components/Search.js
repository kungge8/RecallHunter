import React, { Component } from 'react';
import './main.css';
import axios from 'axios';
// import $ from 'jquery';

class Search extends Component{
  constructor(props){
    super(props);

    //state goes here if needed
    this.state = {
      data: undefined
    };

    this.searchDatabase = this.searchDatabase.bind(this);
  }

  //make it so this fired onClick for a button
  searchDatabase(){
    if(this.props.product && this.props.category){
      axios.get('CUSTOM URL').then(function(response){
        this.state.data = response;
        //format the data now
        
      });
    }
  }


  render(){
    //what are we using to make the api call (ajax,axios)
    //take the props(product and category) and construct the api call
    //make a div after we have the data and populate said div (formatted data)
    return (
      <div className='centering'>
        <button className='btn btn-primary' onClick={this.searchDatabase}>Search</button>
        <div className='resultDiv'></div>
      </div>
    );

  }
}

export default Search;
