import React from 'react';

const Titles = ({ titleBold, title='' ,subTitle ,BoldColor = 'black', titleColor = 'black', subColor = 'black', className = 'center'}) => {
    return ( 
        <div className={className}>
        <div className="headLine text-center col-12 col-md-7 px-0" >
            <h2 style={ { color: titleColor } } 
                className="h2Title">
                    <span style={ { color: BoldColor } } 
                          className="font-weight-bold">{titleBold}
                    </span> {title}
            </h2>

            <h3 style={ { color: subColor } }
                className="h3Title text-right" >{subTitle}
            </h3>

            <hr/>
            
        </div>
    </div>  
     );
}
 
export default Titles;

/*
import Titles from '../../services/titles';

<Titles titleBold=''
        title= ''
        subTitle=''
        BoldColor=''
        titleColor=''
        subColor=''
        className=''
        />
*/