import React from 'react';
import { Link } from 'react-router-dom';

const ALink = ({ to, className ='btn btn-outline-dark', text=''}) => {
    return ( 

        <Link className={className} 
              to={to}>
              {text}
        </Link>

     );
}
 
export default ALink;

/*
import ALink from '../../services/a-link';

<div className="center pb-4">
    <ALink to='' className='' text='' />
</div>
*/