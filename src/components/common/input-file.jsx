import React from "react";

const InputFile = ({
    name, 
    error, 
    text='בחר קובץ' ,
    accept = 'image/*',
    className='form-control m-0 text-rtl', 
    divClass="mb-2", 
    value='',
     ...rest 
    }) => {

  return (
    <div className={divClass}>
        <input {...rest} 
            accept={accept}
            value={value}
            type='file'
            name={name} 
            id='real-button'
            hidden
            multiple
            />

        <button className={className}
                id='btn'
                onClick={(e)=>{
                    e.preventDefault()
                    document.getElementById('real-button').click(); }}
                    >
                        {value === '' ? text : value }
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

*/
