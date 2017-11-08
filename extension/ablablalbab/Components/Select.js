import React, { Component } from 'react';
import './main.css';

class Select extends Component{
  constructor(props){
    super(props);

    //state goes here if needed
    this.state = {
      category: ''
    };

    this.saveChange = this.saveChange.bind(this);
  }

  saveChange(e){
    this.setState({category: e.target.value}, function(){
      // console.log(this.state.category);
    });

    this.props.onDepartmentChange(e.target.value);
  }

  render(){
    //what will the component contain
    //lets see... we will be using bootstrap
    //get a text input that knows its value (need state)
    //maybe need a container component to lift state up to
    return (
      <form className='form'>
          <div className='form-group'>
            <h4>Category Name</h4>
            <p>Department Chosen: {this.state.category}</p>
            <select multiple className="form-control" id="categoryName" onChange={this.saveChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
      </form>
    );

  }
}

export default Select;
