import React, { Component } from 'react';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom'
// import { getCurrentUser } from "../../services/userService";

class NavBar extends Component {

    state = { }

    render() { 
    
        const { user } = this.props;
       
        return ( 

            <header>

                <Link to="logo" className="up fa fa-chevron-up" smooth={true} duration={1000}> </Link>

            <div className="container">
                <div className="row justify-content-between">
    
                    <div className="logo center">
                        <NavLink id='logo' to="/"><img src="/images/logo/ANU_white.png" alt="logo"/></NavLink>
                    </div>
    
                    <div>
                        <NavLink to='/private-area/sign-up'>האיזור האישי</NavLink>
                    </div>
                    
                         { user && <NavLink className='logout' to='/private-area/logout'>logout</NavLink> } 
    
                </div>
            </div>
        </header>
         );
    }
}
 
export default NavBar;