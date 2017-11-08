import React, { Component } from 'react';
import Holder from './components/Holder.js';
// import logo from './logo.svg';
import './main.css';

class App extends Component {
	state = {
		timer: 0
	}

	// tick = () => {
	// 	this.setState({
	// 		timer: this.state.timer + 1
	// 	});
	// }

	componentDidMount = () => {
		chrome.storage.sync.get("recallUser", function(items){
      if (!chrome.runtime.error){
        console.log(items);
      }
    });

    chrome.storage.sync.set({"testing": "testing123"}, function(){
      if (chrome.runtime.error){
        console.log("runtimeError");
      }
    })
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

        </div>
      </div>
    );
  }
}

export default App;