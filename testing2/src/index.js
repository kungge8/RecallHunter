import React from 'react';
import ReactDOM from 'react-dom';
import Frame from './frame';
import App from './App.js';

let container = document.createElement('div');
container.setAttribute("id", "app-wrapper");
document.getElementsByClassName("bucketDivider")[0].parentElement.prepend(container);

ReactDOM.render(<App />, container);

// if (Frame.isReady()) {
//   Frame.toggle()
// } else {
//   boot()
// }

// function boot() {
//   const root = document.createElement('div')
//   document.body.appendChild(root)

//   ReactDOM.render(<Frame />, root)
// }
