import React, { Component } from 'react';
import ALink from '../common/a-link';

class About extends Component {
    state = { 
        aboutBgImgUrl: '/images/about/Bg_Image.jpg',
        aboutBgImgAlt: 'תמונת רקע של אודות',

        aboutInsideImgUrl: '/images/about/inside_Img.jpg',
        aboutInsideImgAlt: 'תמונת רקע של אודות',
     }

     backgroundImage = {
            backgroundImage: "url('../images/about/Bg_Image.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
     }

    render() { 
        return ( 
            <div id="about" className="about container-fluid px-0" style={this.backgroundImage}>
                <div className="container px-0">
                    <div className=" justify-content-between">
                        <div className="row col-12 px-0 mx-0">
                            <div className="image_container col-12 col-md-6 px-2 d-none d-sm-block">
                                <img id="about-previw-picture" className="about_img py-5 img-fluid" 
                                     src={this.state.aboutInsideImgUrl}
                                     alt={this.state.aboutInsideImgAlt}/>

                                <div className="d-none" id="about-input"></div>
                            </div>

                            <div className="align-self-center col-12 col-md-6">
                                <div className="headLine text-right">
                                    <h2 className="about_title display-4">
                                        <span className="font-weight-bold">אודות</span> 
                                    </h2>

                                    <p className="text-rtl">סטודיו לאדריכלות עיצוב פנים ובנייה הנותן שירות מקצה לקצה בכל הנוגע לבנייה או שיפוץ נכס מהמאקרו למיקרו.</p>

                                    <ALink to='/resumes/resume-search-page' 
                                           className='rounded'
                                           text='...לפרטים נוספים' />

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
         );
    }
}
 
export default About;