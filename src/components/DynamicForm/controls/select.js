import React from 'react';

export default class Select extends React.Component {

    render () {  
        
        var { m, value, props, onChange } = this.props;
        
        var input = m.options.map((o) => {  
            return (
                <option {...props}
                    className="form-input"
                    key={o.key}
                    value={o.value}
                    checked={ o.value === value}
                >{o.value}</option>
            );
        });    

        return (<select value={value} onChange={(e)=>{onChange(e, m.key)}}>{input}</select>);
    }
}