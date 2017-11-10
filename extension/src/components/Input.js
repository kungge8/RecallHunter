import React, { Component } from 'react';
import '../main.css';

const Input = (props) => {
  return (
      <form className='form'>
          <div className='form-group'>
            <h4>Product Name</h4>
            <p>Product Chosen: {props.product}</p>
            <input type="text" className="form-control juice" id="productName" aria-describedby="productHelp" placeholder="" value={props.product} onChange={props.onProductChange} />
          </div>
      </form>
    );
}

// class Input extends Component{
//   constructor(props){
//     super(props);

//     //state goes here if needed
//     this.state = {
//       product: document.getElementById("productTitle").innerHTML.trim()
//     };

//     this.saveChange = this.saveChange.bind(this);
//   }

//   saveChange(e){
//     this.setState({product: e.target.value}, function(){
//       // console.log(this.state.product);
//     });

//     this.props.onProductChange(e.target.value);
//   }

//   render(){
//     //what will the component contain
//     //lets see... we will be using bootstrap
//     //get a text input that knows its value (need state)
//     //maybe need a container component to lift state up to
//     return (
//       <form className='form'>
//           <div className='form-group'>
//             <h4>Product Name</h4>
//             <p>Product Chosen: {this.state.product}</p>
//             <input type="text" className="form-control" id="productName" aria-describedby="productHelp" placeholder="" value={this.state.product} onChange={this.saveChange} />
//           </div>
//       </form>
//     );
//   }
// }

export default Input;
