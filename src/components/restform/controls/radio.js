import React from 'react';

export default class Radio extends React.Component {

    render () {  
        
        var { m, value, props, onChange } = this.props;
        
        var input = m.options.map((o) => {                 
            return (
                <React.Fragment key={'fr' + o.key}>
                    <input {...props}
                            className="form-input"
                            type="radio"
                            key={o.key}
                            name={o.name}
                            checked={ o.value === value}
                            value={o.value}
                            onChange={(e)=>{onChange(e, o.name)}}
                    />
                    <label key={"ll" + o.key }>{o.label}</label>
                </React.Fragment>
            );
       });
      
       return (<div className ="form-group-radio">{input}</div>);
    }
}