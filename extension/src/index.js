import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let container = document.createElement('div');
container.setAttribute("id", "app-wrapper");
document.getElementsByClassName("bucketDivider")[0].parentElement.prepend(container);

ReactDOM.render(<App />, container);
// registerServiceWorker();

// if (Frame.isReady()) {
//   Frame.toggle()
// } else {
//   boot()
// }

// function boot() {
//   const root = document.createElement('div');
//   document.body.appendChild(root);

//   ReactDOM.render(<App />, root);
// }