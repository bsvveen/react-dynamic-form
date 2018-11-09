import React from 'react';
import './form.css';

import CheckBox from './controls/checkbox';
import Radio from './controls/radio';
import Select from './controls/select';

export default class DynamicForm extends React.Component {
    
    state = { loading: false, errors: [], data: {} };  

    componentWillReceiveProps(nextProps){
        if(nextProps.defaultValues !== this.props.defaultValues)         
           this.onReset();
    }

    onReset = () => {        
        this.setState({ loading: false, errors: [], data: {} }); 
    }

    onSubmit = (e) => {
        e.preventDefault();

        let validationErrors = this.props.onValidate(this.state.data); 
        if (Object.keys(validationErrors).some(x => validationErrors[x])) {
            this.setState({ validationErrors: validationErrors })           
            return;
        }

        if (this.props.onSubmit) {
            this.setState({ loading: true });

            let finalResult = Object.assign({}, this.props.defaultValues, this.state.data);
            this.props.onSubmit(finalResult).then((reponse) => {
                this.onReset;            
            }).catch((errors) => {
                this.setState({ "errors": [errors] });
            }); 
        }   
    }    

    onChange = (e, key, type = "single") => {  
        let value;      
        if (type === "single") {
            value = e.target.value;
        } else { 
            value = this.state.data[key] || [];

            if (e.target.checked)
                value.push(e.target.value);

            if (!e.target.checked)
                value.splice(value.indexOf(e.target.value), 1);                          
        }

        var data = Object.assign({}, this.state.data, { [key]: value });
        this.setState( { data: data });    
    }

    renderForm = () => {
        let model = this.props.model; 
        
        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name= m.name;

            let defaultValue = this.props.defaultValues[m.key] || "";
            let value = this.state.data[key] || defaultValue;  
            let errors = this.state.errors;             

            let input = <input {...props}
                    className="form-input"
                    type={type}
                    key={key}
                    name={name}
                    value={value}
                    onChange={(e)=>{this.onChange(e, key)}}
                />;

            if (type === "radio") 
                input = <Radio m={m} value={value} onChange={this.onChange} {...props} />  
           
            if (type === "select") 
                input = <Select m={m} value={value} onChange={this.onChange} {...props} />    

            if (type === "checkbox")
                input = <CheckBox m={m} value={value} onChange={this.onChange} {...props} />    
            
            return (
                <div key={'g' + key} className="form-group">
                    <label className="form-label"
                        key={"l" + key}
                        htmlFor={key}>
                        {m.label}
                    </label>
                    {input}
                    <span className="error">{ errors[key] ? errors[key] : "" }</span>
                </div>
            );
        });
        return formUI;
    }

    render () {
        let title = this.props.title || "Dynamic Form";

        return (
            <div className={this.props.className}>
                <h3 className="form-title">{title}</h3>
                <form className="dynamic-form" onSubmit={(e)=>{this.onSubmit(e)}}>
                    {this.renderForm()}
                    <div className="form-actions">
                        <button type="reset" onClick={this.onReset}>reset</button>
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
        )
    }
}