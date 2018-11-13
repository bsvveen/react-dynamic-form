import React, { Component } from 'react';
import RestForm from './components/restform';

import './App.css';

class App extends Component {  

  onValidate = (data) => {       
    let errors =  {
        "datum": data.datum > new Date() ? "Date must be in the future" : false,
        "meertekst": data.meertekst.length < 25 ? "Name must have more than 25 chartacters" : false    
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
