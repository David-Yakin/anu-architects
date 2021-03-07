import React, { Component } from 'react';
import ALink from '../../common/a-link';
import { getMyResume } from '../../../services/resumeService'
import { url } from '../../../config.json';

class Resume extends Component {

    state = { 
        resume: {}
     }

     async componentDidMount(){
        const resumeId = this.props.match.params.id; 
        const { data } = await getMyResume(resumeId);
        this.setState({ resume: data })
     }

    render() { 
        const { resume } = this.state;
        return ( 
            <div className="container-fluid">
                <div className="container">
                    <div className="center">

                        <div className="col-10">

                            <h5 className='text-right pt-2'>
                                <span className='font-weight-bold'>אנו ארכיטקטורה</span> הצוות
                            </h5>

                            <hr/>

                            <div className="row  pt-1">

                                <div className="col-12 col-md-5">
                                    <img src={`${url}${resume.profileUrl}`} 
                                      className="card-img-top" 
                                      alt={resume.profileAlt}/>                          
                                </div>

                                <div className="col-12 col-md-7 center-items d-flex justify-content-end">

                                    <div className="">
                                        <h1 className="font-weight-bold text-right ">{resume.title}</h1>
                                        <h4 className=" text-right">{resume.subTitle}</h4>
                                    </div>

                                 </div>  

                            </div>

                            <div className="row d-flex flex-row-reverse pt-4">

                                <div className=" col-12 col-md-6">
                                    <p className="text-rtl">{resume.firstP}</p>
                                    <p className="text-rtl">{resume.secondp}</p>
                                </div> 
                                

                                <div className=" col-12 col-md-6">
                                    <p className="text-rtl">{resume.thirdP}</p>
                                    <p className="text-rtl">{resume.firstP}</p>
                                </div> 

                            </div>
                                    <div className="center pb-3">
                                    <ALink to='/resumes/resume-search-page'  text='לחברי צוות נוספים' />
                                 
                                </div>
                   

                        </div>
                    </div>

                </div>
            </div>
         );
    }
}
 
export default Resume;