import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class Todo extends Component {
  state = {
    todos:[],
    currentTodo: ''
  }
   
  handleClick = () => {if (this.state.currentTodo.length > 0) {
    let todosCopy = this.state.todos.slice();
    todosCopy.push(this.state.currentTodo);
    this.setState({todos:todosCopy,
      currentTodo:''});
      console.log(this.state.todos)
  }}

  handleChange = e => 
    this.setState({currentTodo:e.target.value});

  deleteTodo = i => {
    let todosCopy = this.state.todos.slice();
    todosCopy.splice(i,1);
    this.setState({todos:todosCopy})};


  render()
  {
  let bulletedTodos = this.state.todos.map((e,i) => {
    return <SingleTodo key = {i} delete = {() => this.deleteTodo(i)} index = {e} todos = {e}/>
  });

  return (
  <div>
    <input placeholder = 'Input todo here' value = {this.state.currentTodo} onChange = {this.handleChange} type="text"/>
    <button onClick= {this.handleClick}>Add todo</button>
    <br/>
    {this.state.todos.length == 0 ? 'no todos yet' : <ul>{bulletedTodos}</ul>}

  </div>
  )}}
  
  let SingleTodo = props => 
  <li>{props.todos}<button onClick = {props.delete}>X</button></li>

export default Todo;

