import React from 'react';
import { Link } from 'react-router-dom'



const SideRow = ({ item, toggleSideNav, index }) => {
    const { row, navs } = item;
    return ( 

        <div >
            <div className='side-row'
              onClick={()=> toggleSideNav(index)}
            >
                <hr className='m-0'/>
                    <div className='row py-2' >
                        <div className="center col-2">
                           <i className={row.icon}></i> 
                        </div>
                         <div className="d-none col-lg-8 d-xl-block">
                            <span className='text-rtl'>{row.text}</span>         
                        </div>
                        <div className="center col-2">
                            <i className={ (item.open ? "fas fa-angle-up" : "fas fa-angle-down" )  }></i>       
                        </div>
                    </div>
                <hr className='m-0'/>
            </div>
            
            { navs.map( (nav, i) =>{
                return(
                    <div key={i} className={ ( item.open ? "side-nav-open m-0" : 'side-nav-close m-0' ) }>
                        <div className="row py-2 side-nav">
                            <div className="col-2"><Link className={nav.icon} to={nav.page}> </Link></div>
                            <div className="d-none col-lg-8 d-xl-block">
                                <Link className='text-rtl side-nav' to={nav.page}>{nav.text}</Link>
                            </div>
                        </div>        
                    </div>
                )
            } ) }

        </div>
     );
}
 
export default SideRow;
