import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../config.json';

class Footer extends Component {

    state = {  }

    render() { 
        return ( 
            <footer>
            <div className="container-fluid">
                <div className="container">
    
                    <div className="center pt-5">
                        <div className="logo zoom">
                            <Link to="/">
                                <img src={`${url}/images/footer/logo.png`} 
                                     alt="logo"/>
                            </Link>
                        </div>
                    </div>

                    <div className="center py-4">
                        <div className="row col-12 col-md-5 justify-content-between">
                            <i className="fab fa-instagram px-1"aria-hidden="true"></i>
                            <i className="fab fa-facebook-square px-1" aria-hidden="true"> </i>
                            <i className="fab fa-youtube text-white px-1" aria-hidden="true"></i>
                            <i className="fab fa-linkedin-square px-1" aria-hidden="true"></i>
                            <a href="tel:052-7737888" className="fa fa-phone px-1" aria-hidden="true"> </a>
                            <a href="mailto:anu.arch.rl@gmail.com" className="far fa-envelope px-1"> </a>
                        </div>
                    </div>
                    <hr/>
                    <div className="row justify-content-between pb-3">
                        
                        <a href="mailto:anu.arch.rl@gmail.com" className="zoom">anu.arch.rl@gmail.com</a>
    
                        <div className="copywrites">
                            <span className="font-weight-bold">ANU</span> ARCHITECTS<span> - כל הזכויות שמורות
                                ל&#169; </span>
                        </div>
    
                        <a href="tel:052-7737888" className="zoom">052-7737888</a>
    
                    </div>
                </div>
    
            </div>
        </footer>
         );
    }
}
 
export default Footer;