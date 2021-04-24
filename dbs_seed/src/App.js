import './App.css';
import React, { Component } from 'react';
import {nricValidator} from './SingaporeNricValidator'
import {branchNameCodes} from './BranchCodes'

class App extends Component {
  state = {
    customerName: '',
    customerAge: '',
    serviceOfficerName: '',
    nric: '',
    branchCode: '',
    productType: 'Current Account'
  };

  errors = {
    customerAge: '',
    nric: '',
    branchCode: ''
  }

  branch = {
    branchName: ''
  }
   
  validateAge = age => {
    if (age && age < 18) {
      this.errors.customerAge = 'Customer must be at least 18 years old';
      return;
    }
    this.errors.customerAge = ''
    return;
  }

  validateBranchCode = branchCode => {
    let parse = parseInt(branchCode)
    if (branchCode && branchCode.length != 3) {
      this.errors.branchCode = 'Branch code must be 3 digits';
      this.branch.branchName = '';
      return;
    }
    if (branchCode && !branchNameCodes[parse]) {
      this.errors.branchCode = 'Invalid branch code';
      console.log(parse);
      this.branch.branchName = '';
      return;
    }
    this.errors.branchCode = '';
    this.branch.branchName = branchNameCodes[parse];
    return;
  }

  validateNric = nric => {
    if (nric && !nricValidator(nric)) {
      this.errors.nric = 'Invalid NRIC';
      return;
    }
    this.errors.nric = '';
    return;
  }
  
  
  handleChange = e => {
    var {name, value} = e.target;
    if (name == 'customerAge') {
      this.validateAge(value);
      if (value.length > 3) {
        return
      }
    }
    if (name == 'branchCode') {
      this.validateBranchCode(value);
    }
    if (name == 'nric') {
      this.validateNric(value);
    }
    this.setState({[name]:value});
  }

  handleSubmit = e => {
    e.preventDefault();
    for (var values of Object.values(this.errors)){
      if (values) {
        alert(values)
        return;
      }
    }
    let result = window.confirm('Are you sure you want to submit?')
    if (result == false) {
      return;
    }
    console.log('Customer name: ' + this.state.customerName)
    console.log('Customer Age: ' + this.state.customerAge)
    console.log('Service Officer Name: ' + this.state.serviceOfficerName)
    console.log('NRIC: ' + this.state.nric)
    console.log('Branch Code: ' + this.state.branchCode)
    console.log('Product Type: ' + this.state.productType)

    this.setState({customerName: '',
    customerAge: '',
    serviceOfficerName: '',
    nric: '',
    branchCode: '',
    productType: 'Current Account'})

  }

  render () {
    return (
      
      <form className = 'border' onSubmit = {this.handleSubmit}>
      
        <TextInput label = 'Customer Name:'
                   name = 'customerName'
                   value = {this.state.customerName}
                   handleChange = {this.handleChange}/>

        <NumberInput label = {'Customer Age:'}
                   name = 'customerAge'
                   value = {this.state.customerAge}
                   error = {this.errors.customerAge}
                   handleChange = {this.handleChange}/> 

        <TextInput label = {'Service Officer Name:'}
                   name = 'serviceOfficerName'
                   value = {this.state.serviceOfficerName}
                   handleChange = {this.handleChange}/>

        <TextInput label = {'NRIC:'}
                   name = 'nric'
                   value = {this.state.nric}
                   error = {this.errors.nric}
                   handleChange = {this.handleChange}/>

        <NumberInput label = {'Branch Code:'}
                   name = 'branchCode'
                   value = {this.state.branchCode}
                   error = {this.errors.branchCode}
                   branchName = {this.branch.branchName}
                   handleChange = {this.handleChange}/>

        <SelectInput label = {'Product Type:'}
                   name = 'productType'
                   value = {this.state.productType}
                   options = {this.props.productTypeOptions}
                   handleChange = {this.handleChange}/>

        <input className = 'submit' type = 'submit' value = 'Submit'/>

      </form>
    );
    
  }
}

App.defaultProps ={
  productTypeOptions: [
    'Current Account',
    'Savings Account',
    'Fixed Deposit'
  ]
};

let TextInput = props =>
    <div>
      <div>
        {props.label}
      </div>
        <input name = {props.name}
              className = 'contents'
              required
              value = {props.value}
              onChange = {props.handleChange}
        /> 
        {(props.error) && <ErrorMessage error = {props.error}/>}  
    </div>

let NumberInput = props =>
    <div>
      <div>
        {props.label}
      </div>
        <input type = 'number'
              className = 'contents'
              required
              name = {props.name}
              value = {props.value}
              onChange = {props.handleChange}
        />
        {(props.error) && <ErrorMessage error = {props.error}/>}
        {(props.branchName) && <div style = {{marginBottom: '10px'}}>
          {props.branchName}
        </div>}   
    </div>
  
let SelectInput = props =>
    <div>
      <div>
        {props.label}
      </div>
        <select name = {props.name}
              className = 'contents'
              value = {props.value}
              onChange = {props.handleChange}>
      {
        props.options.map(
          (option) => <option key = {option}
                            value = {option}>{option}</option>
        )
      }           
        </select>
    </div>

let ErrorMessage = props =>
      <div className = 'error'>
        {props.error}
      </div>

 export default App;

