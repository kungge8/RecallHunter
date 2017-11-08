import React, { Component } from 'react';
import Holder from './components/Holder.js';
// import logo from './logo.svg';
import './main.css';

class App extends Component {
	state = {
		timer: 0,
    optionsUrl: chrome.extension.getURL('optionsPage/optionsIndex.html'),
    user: chrome.storage.sync.get("recallUser", function(items){
      if(chrome.runtime.error){
        console.log("Chrome error: ", chrome.runtime.error);
      }
    })
	}

	// tick = () => {
	// 	this.setState({
	// 		timer: this.state.timer + 1
	// 	});
	// }

	componentDidMount = () => {

    // $.get('https://warm-tor-17137.herokuapp.com/articles', function(req, res) {
    //     console.log(res);
    // });

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
              this.setState({user: res._id});
           });
        }
        else {
          console.log("recallUser is not empty: ", items);
        }
      }
    });
	}

  render() {
  	console.log("app element loaded");
    return (
      <div className="App">
        <div className='container'>

          <div className='heading'>
            <h1 className='appTitle'>Recall Raven</h1>
          </div>

          <Holder />
          <a href={this.state.optionsUrl} target="_blank">Options</a>
        </div>
      </div>
    );
  }
}

export default App;