import React, { Component } from 'react';
import OpenSceen from "./open-sceen";
import Recent from "./projects/recent-projects";
import About from "./about";
import Process from "./process";
import Gallery from "./gallerys";
import BlogsSummary from "./blogs/blogs-summary";
import Qna from "./qna/qna";
import ContectUs from "./contact-us";
import { getCurrentUser } from "../../services/userService";
import { Link } from 'react-scroll';

class Main extends Component {
    state = {  }

    componentDidMount(){
        const user = getCurrentUser();
        this.setState({ user });
      }  

    render() { 
        
        const { user } = this.state;

        return ( 
            <div>
                <div className="container position-relative px-0">
                    <div className="nav-main">

                    <nav className="d-none d-xl-flex flex-row-reverse justify-content-between mx-0">
                        <Link className='nav-a' to="recent-projects" smooth={true} duration={1000}> פרויקטים  אחרונים</Link>
                        <Link className='nav-a' to="about" smooth={true} duration={1000}>אודות</Link>
                        <Link className='nav-a' to="theProcess" smooth={true} duration={1000}>התהליך</Link>
                        <Link className='nav-a' to="gallery" smooth={true} duration={1000}>גלריה</Link>
                        <Link className='nav-a' to="blog" smooth={true} duration={1000}>בלוג</Link>
                        <Link className='nav-a' to="faq" smooth={true} duration={1000}>שאלות ותשובות</Link>
                        <Link className='nav-a' to="contact" smooth={true} duration={1000}>צור קשר</Link>
                    </nav>
                    
                    </div>
                </div>
  
                <div className='position-relative'>
                    <OpenSceen />  
                    <Recent user={user}/>
                    <About />
                    <Process />
                    <Gallery />
                    <BlogsSummary />
                    <Qna />
                    <ContectUs />
                </div>

            </div>
         );
    }
}
 
export default Main;
