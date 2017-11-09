import React, { Component } from 'react';
import Holder from './components/Holder.js';
import Input from './components/Input.js';
import Search from './components/Search.js';
import Watchlist from './components/Watchlist.js';
// import logo from './logo.svg';
import './main.css';

class App extends Component {
	state = {
		timer: 0,
    optionsUrl: chrome.extension.getURL('optionsPage/optionsIndex.html'),
    user: {},
    product: document.getElementById("productTitle").innerHTML.trim()
	}

	componentDidMount = () => {
    let parent = this;
    chrome.storage.sync.get("recallUser", function(items){
      if (!chrome.runtime.error){
        if($.isEmptyObject(items)) {
          $.ajax({
            method: "GET",
            url: "https://shielded-retreat-77848.herokuapp.com/api/newToken"
           }).done(function(res) {
              chrome.storage.sync.set({"recallUser": res._id}, function() {
                chrome.storage.sync.get("recallUser", function(item) {
                  console.log(item);
                });
              });
              parent.setState({user: {'recallUser': res._id}});
           });
        }
        else {
          console.log("recallUser is not empty: ", items);
          parent.setState({
            user: items
          })
        }
      }
    });
	}

  saveProduct = (e) => {
    this.setState({product: e.target.value}, function(){
      console.log(this.state.product);
    });
    // this.setState({product: product},function(){
    //   console.log(this.state.product);
    // });
  }

  //partially applied function to hold the user id from state in App, and pass it down to each addWatch button rendered by Search to use as an onClick
  addToWatch = (user) => {
    return (event) => {
      let data = {
        _id: user,
        product: title.target.getAttribute("title")
      };

      console.log("addtowatch DATA: ", data);
      $.ajax({
        method: "PUT",
        url: "https://shielded-retreat-77848.herokuapp.com/api/watchlists",
        data: {
          _id: user,
          product: event.target.getAttribute("title")
        }
      }).done(
        function(res){
          console.log("addToWatch Ran: ", res);
        }
      )
    }
  }

  render() {
  	console.log("app element loaded", this.state.user);
    return (
      <div className="App">
        <div className='container'>

          <div className='heading'>
            <h1 className='appTitle'>Recall Raven</h1>
          </div>

          <Input onProductChange={this.saveProduct} product={this.state.product} />
          <Search product={this.state.product} addWatch={this.addToWatch(this.state.user.recallUser)} />

          <a href={this.state.optionsUrl} target="_blank">Options</a>
        </div>
      </div>
    );
  }
}

export default App;