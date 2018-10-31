import React from 'react';
import './form.css';

export default class DynamicForm extends React.Component {
    
    state = { loading: false, errors: [], data: {} };  

    componentWillReceiveProps(nextProps){
        if(nextProps.defaultValues !== this.props.defaultValues)         
           this.onReset();
    }

    onReset = () => {        
        this.setState({ loading: false, errors: [], data: {}}); 
    }

    onSubmit = (e) => {
        e.preventDefault();
        let result = Object.assign({}, this.props.defaultValues, this.state.data);
        if (this.props.onSubmit) 
            this.props.onSubmit(result);
    }

    onChange = (e, key, type="single") => {  
        let value;      
        if (type === "single") {
            value = e.target.value;
        } else { 
            value = this.state[key] || [];

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

            let input = <input {...props}
                    className="form-input"
                    type={type}
                    key={key}
                    name={name}
                    value={value}
                    onChange={(e)=>{this.onChange(e, key)}}
                />;

            if (type === "radio") {
               input = m.options.map((o) => {                 
                    return (
                        <React.Fragment key={'fr' + o.key}>
                            <input {...props}
                                    className="form-input"
                                    type={type}
                                    key={o.key}
                                    name={o.name}
                                    checked={ o.value === value}
                                    value={o.value}
                                    onChange={(e)=>{this.onChange(e, o.name)}}
                            />
                            <label key={"ll" +o.key }>{o.label}</label>
                        </React.Fragment>
                    );
               });
               input = <div className ="form-group-radio">{input}</div>;
            }

            if (type === "select") {
                input = m.options.map((o) => {  
                    return (
                        <option {...props}
                            className="form-input"
                            key={o.key}
                            value={o.value}
                            checked={ o.value === value}
                        >{o.value}</option>
                    );
                });
               
                input = <select value={value} onChange={(e)=>{this.onChange(e, m.key)}}>{input}</select>;
            }

            if (type === "checkbox") {
                input = m.options.map((o) => {                   
                   
                    let checked = false;
                    if (value && value.length > 0)
                        checked = value.indexOf(o.value) > -1 ? true : false;
                                       
                    return (
                        <React.Fragment key={"cfr" + o.key}>
                            <input {...props}
                                className="form-input"
                                type={type}
                                key={o.key}
                                name={o.name}
                                checked={checked}
                                value={o.value}
                                onChange={(e)=>{this.onChange(e, m.key,"multiple")}}
                            />
                            <label key={"ll" +o.key }>{o.label}</label>
                        </React.Fragment>
                     );
                });

                input = <div className ="form-group-checkbox">{input}</div>;
            }
            
            return (
                <div key={'g' + key} className="form-group">
                    <label className="form-label"
                        key={"l" + key}
                        htmlFor={key}>
                        {m.label}
                    </label>
                    {input}
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