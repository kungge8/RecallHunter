import React, { Component } from 'react';
import '../main.css';
import axios from 'axios';
import Results from './Results.js';
// import $ from 'jquery';

class Search extends Component{
  constructor(props){
    super(props);

    //state goes here if needed

    this.searchDatabase = this.searchDatabase.bind(this);
  }

  state = {
    results: []
  }

  //make it so this fired onClick for a button
  searchDatabase = () => {
    // console.log("searchDatabase: ", this);
    let adjustedProduct = this.props.product;
    adjustedProduct = adjustedProduct.split(' ').join('+');
    // console.log(adjustedProduct);
    // const theDiv = document.getElementsByClassName('resultDiv')[0];
    // theDiv.innerHTML = '';
    // let content = '';
    let parent = this;
    if(this.props.product){
      axios.get(`https://www.saferproducts.gov/RestWebServices/Recall?ProductName=${adjustedProduct}&Format=json`)
      .then(function(response){
        if(response.data.length){
          parent.setState({
            results: response.data
          })
            // for(let i = 0; i < response.data.length; i++){

            //       let chosen = response.data[i];
            //       content += '<div class="recall-container">';
            //         content += '<p class="p-title"> Title: ' + chosen.Title + '</p>';
            //         content += '<p class="p-desc"> Description: ' + chosen.Description + '</p>';
            //         content += '<p class="p-date"> Recall Date: ' + chosen.RecallDate + '</p>';
            //         content += '<p class="p-url"> URL: <a href='+chosen.URL+'>' + chosen.URL + '</a>' + '</p>';
            //         content += '<p class="p-contact"> Contact: <a href='+chosen.ConsumerContact+'>' + chosen.ConsumerContact + '</a>' + '</p>';
            //       content += '</div>';

            //     theDiv.innerHTML += content;
            //     content = '';
            // }

        }else{
          // theDiv.innerHTML = "No Results - Maybe rearrange input (Galaxy Note 7 is actually Galaxy Note7)";
          parent.setState({
            results:[{
              Title: "No Results - Maybe rearrange input (Galaxy Note 7 is actually Galaxy Note7)"
            }]
          })
        }
      });
    }
  }


  render(){
    //what are we using to make the api call (ajax,axios)
    //take the props(product and category) and construct the api call
    //make a div after we have the data and populate said div (formatted data)

    // console.log("searchrender: ", this.state.results);
    return (
      <div className='centering'>
        <button className='btn btn-primary' onClick={this.searchDatabase}>Search</button>
        <div className='resultDiv'>
          {
            this.state.results.map((n) => {
              return (
                <Results
                  key={n.Title}
                  title={n.Title}
                  recDate={n.RecallDate}
                  URL={n.URL}
                  contact={n.ConsumerContact}
                  addWatch={this.props.addWatch}
                />
              );
            })
          }
        </div>
      </div>
    );

  }
}

export default Search;