import React from 'react';

const SelectBox = ({ name, error, defaultText, options, divClass="col-12 px-0 d-flex justify-content-end", className="form-select p-2 rounded mb-2", ...rest }) => {
    return ( 
        <div className={divClass}>
            <select {...rest}
                    name={name}
                    className={className}>
                <option defaultValue='' >{defaultText}</option>
                {options.map( (i, index) => <option key={index} value={i.value}>{i.text}</option>)}
            </select>
            {error && <span className="text-danger">{error}</span>}
        </div>
     );
}
 
export default SelectBox;

/**
 
 { this.renderSelectBox('name', 'defaultText', [
     {text:'', value:'' },
     {text:'', value:'' }, 
     {text:'', value:'' }]) }

 */