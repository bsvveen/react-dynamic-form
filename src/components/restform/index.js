
import React, { Component } from 'react';
import DynamicForm from './dynamicform';
import Repository from './repository';
import List from './controls/list';

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

  onEdit = (object) => {   
    this.repository.Get(object.id).then( getResponse => {
      this.setState({ current: getResponse })
    });
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
    
    return (      
      <div className="App">
        <DynamicForm className="form"
          title = "Registration"
          defaultValues = {this.state.current}
          model = {this.state.model}
          onSubmit = {this.onSubmit} 
          onValidate = {this.onValidate} 
        />

        <List items={this.state.list} onRowClick={this.onEdit} />

        <button onClick={this.onNew}>New</button>

      </div>
    );    
  }
}

export default RestForm;
