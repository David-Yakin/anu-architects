import React, { Component } from 'react';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom'
import {url} from '../../config.json';

class NavBar extends Component {

    state = {
        scrolled: false
     }

     scollFn = ()=>{
     if(window.scrollY === 0 || window.scrollY === 1){
        const { scrolled } = this.state;
        const onScroll = !scrolled;
        return this.setState({scrolled: onScroll});
     } 
     return this.setState({scrolled: true });
    } 
    
     render() { 
        const { user } = this.props;
        const { scrolled} = this.state;
        window.addEventListener("scroll", this.scollFn);
        return ( 

            <header>
                <Link to="logo" className={ scrolled === true ? "up fa fa-chevron-up" : ''} smooth={true} duration={1000}> </Link>

            <div className="container">
                <div className="row justify-content-between">
    
                    <div className="logo center">
                        <NavLink id='logo' to="/"><img src={`${url}/images/logo/ANU_white.png`} alt="logo"/></NavLink>

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