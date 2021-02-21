import React from "react";

const Input = ({
     name, 
     error, 
     placeholder, 
     className='form-control m-0 text-rtl', 
     divClass="mb-2", 
     ...rest 
    }) => {
  return (
    <div className={divClass}>
      <input {...rest} 
            name={name} 
            id={name} 
            className={className} 
            placeholder={placeholder}/>
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;