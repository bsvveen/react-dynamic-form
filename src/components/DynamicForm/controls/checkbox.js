import React from 'react';

export default class CheckBox extends React.Component {

    render () {  
        
        var { m, value, type, props, onChange } = this.props;
        
        var input = m.options.map((o) => {                   
                   
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
                        onChange={(e)=>{onChange(e, m.key,"multiple")}}
                    />
                    <label key={"ll" +o.key }>{o.label}</label>
                </React.Fragment>
             );
        });        

        return (<div className ="form-group-checkbox">{input}</div>);
    }
}