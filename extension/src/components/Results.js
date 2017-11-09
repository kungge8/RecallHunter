import React, { Component } from 'react';

// class Results extends Component {
// 	constructor(props){
// 		super(props);
// 	}

// 	addWatch = props.addWatch();

// 	render(){
// 		return (
// 			<div className = "recall-container">
// 				<p className = "p-title">{props.title}</p>
// 				<p className = "p-url"><a href={props.URL}>{props.URL}</a></p>
// 				<p className = "p-contact">{props.contact}</p>
// 				<button className = "watchSubmit" onClick={props.addWatch()}>Save to Watchlist!</button>
// 			</div>
// 		); 
// 	}
// }

function Results (props){
	console.log("render Results: ", props.addWatch);
	return (
	<div className = "recall-container">
		<p className = "p-title">{props.title}</p>
		<p className = "p-url"><a href={props.URL}>{props.URL}</a></p>
		<p className = "p-contact">{props.contact}</p>
		<button className = "watchSubmit" title={props.title} onClick={props.addWatch}>Save to Watchlist!</button>
	</div>
	);
}

export default Results;