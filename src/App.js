import React, { Component } from 'react';
import DynamicForm from './components/DynamicForm';
import model from './model.json';
import tools from './tools'
import './App.css';

class App extends Component {
  state = {
    data: [
      {id: 1, name:"a", age:29, qualification:"B.Com",rating:3,gender:"male",city:"Kerala",skills:["reactjs","angular","vuejs"]},
      {id: 2, name:"b", age:35, qualification:"B.Sc",rating:5,gender:"female",city:"Mumbai",skills:["reactjs","angular"]},
      {id: 3, name:"c", age:42, qualification:"B.E",rating:3,gender:"female",city:"Bangalore",skills:["reactjs"]},
    ],
    current: {}
  }

  onSubmit = (model) => {
    let data = Object.assign([], this.state.data);
     
    if (model.id) {
      data = data.filter((d) => { return d.id !== model.id });
    } else {
      model.id = tools.getUniqueId();     
    }
    
    this.setState({ data: [model, ...data] });
  }

  onEdit = (id) => {
    let data = Object.assign([], this.state.data);
    let record = data.find((d) => { return d.id === id; });   
    this.setState({ current: record })
  }

  onNew = () => {       
    this.setState({ current: {} });
  }

  render() {
    let data = this.state.data.map((d) => {
      return (
        <tr key={d.id}>
            <td>{d.name}</td>
            <td>{d.age}</td>
            <td>{d.qualification}</td>
            <td>{d.gender}</td>
            <td>{d.rating}</td>
            <td>{d.city}</td>
            <td>{(d.skills)?d.skills.join(","):""}</td>
            <td><button onClick={()=>{this.onEdit(d.id)}}>edit</button></td>
        </tr>
      );
    });
    
    return (
      <div className="App">
        <DynamicForm className="form"
          title = "Registration"
          defaultValues = {this.state.current}
          model = {model}
          onSubmit = {(m) => {this.onSubmit(m)}} 
        />

        <table border="1">
          <tbody>{data}</tbody>
        </table>

        <button onClick={this.onNew}>New</button>

      </div>
    );
  }
}

export default App;
