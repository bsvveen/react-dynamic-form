
import React, { Component } from 'react';
import DynamicForm from './dynamicform';
import Repository from './repository';
import shared from './shared';

class RestForm extends Component {

  state = {
    isLoading: true,
    list: [],
    current: {},
    model: {}
  }

  componentWillMount() {
    this.repository = new Repository(this.props.endPoint);

    fetch(this.props.model)
      .then(modelResponse => { return modelResponse.json() })
        .then(modelJson => { this.setState({ model: modelJson });

      this.repository.List().then( listResponse => {
        this.setState({ list: listResponse }, () => {
          this.setState({ isLoading: false });
        });
      })
    })    
  }

  onSubmit = (model) => {   
    if (model.id) {      
      return this.repository.Put(model)
    } else {
      model.id = shared.getUniqueId(); 
      return this.repository.Post(model);     
    }  
  }

  onEdit = (id) => {
    let data = Object.assign([], this.state.data);
    let record = data.find((d) => { return d.id === id; });   
    this.setState({ current: record })
  }

  onNew = () => {       
    this.setState({ current: {} });
  }

  onValidate = (data) => {       
    if (this.props.onValidate)
      return this.props.onValidate(data);
  }

  render() {
    if (this.state.isLoading)
      return null;
    
    let data = this.state.list.map((d) => {
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
          model = {this.state.model}
          onSubmit = {this.onSubmit} 
          onValidate = {this.onValidate} 
        />

        <table border="1">
          <tbody>{data}</tbody>
        </table>

        <button onClick={this.onNew}>New</button>

      </div>
    );    
  }
}

export default RestForm;
