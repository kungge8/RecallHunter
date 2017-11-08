import React from 'react';
import ReactDOM from 'react-dom';
// import Frame from './frame';
import App from './App.js';
// import "./main.css";

let container = document.createElement('div');
container.setAttribute("id", "app-wrapper");
document.getElementsByClassName("bucketDivider")[0].parentElement.prepend(container);

ReactDOM.render(<App />, container);

