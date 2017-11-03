import React, { Component } from 'react';
import Form from './components/SearchForm.js';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
	state = {
		timer: 0
	}

	tick = () => {
		this.setState({
			timer: this.state.timer + 1
		});
	}

	componentDidMount = () => {
		this.interval = setInterval(this.tick, 1000);
	}

  render() {
    return (
      <div className="App">
      	<hr/>
      	<p>Chad is hodge</p>
      	<p>{this.state.timer}</p>
        <Form />
      </div>
    );
  }
}

export default App;