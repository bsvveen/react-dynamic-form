import React, { Component } from 'react';
import RestForm from './components/restform';

import './App.css';

class App extends Component {  

  onValidate = (data) => {       
    let errors =  {
        "date": data.date > new Date() ? "Date must be in the future" : false,
        "name": data.name.length < 5 ? "Name must have more than 5 chartacters" : false    
    }; 
    return errors;
  }

  render() {    
    return (
      <div className="Form">
        <RestForm 
          endPoint = "http://localhost:2776/Klant/" 
          onValidate = {this.onValidate} 
          model = "http://localhost:2776/Models/klant.json"
        />
      </div>
    );
  }
}

export default App;
