import React from 'react';

const Textarea = ({ name, error, placeholder, rows="5", cols="100", className = 'text-rtl m-0 col-12', divClass='mb-2 px-0 col-12', ...rest }) => {
    return ( 
        <div className={divClass}>
            <textarea name={name} 
                      cols={cols}
                      id={name} 
                      className={className} 
                      placeholder={placeholder}
                      rows={rows}
                      {...rest}>
            </textarea>
            {error && <span className="text-danger">{error}</span>}
        </div>
     );
}
 
export default Textarea;