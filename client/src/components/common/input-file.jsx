import React from "react";

const InputFile = ({name, error, text='בחר קובץ', accept = 'image/*', divClass="mb-2", className='form-control m-0 text-rtl btn btn-secondary border border-dark', value='', disabled, ...rest}) => {
  return (
    <div className={divClass}>
        <input {...rest} 
            accept={accept}
            value={value}
            type='file'
            name={name} 
            id={name}
            hidden
            multiple
            disabled={disabled}/>

        <button className={className}
                id='btn'
                onClick={e =>{
                    e.preventDefault()
                    document.getElementById(name).click(); }}>
                        {value === '' ? text : value}
        </button>
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default InputFile;

/*
import InputFile from "./input-file";

<InputFile name='' />

 { this.renderFileInput('name' ) }

text=''
 accept=''/''/''/''
 multiple= true
 className=''
 divClass=''

 state: {
   data:{},
   error:{};
   image:[]
 }
*/
