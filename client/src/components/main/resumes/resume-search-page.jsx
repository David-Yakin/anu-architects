import React, { Component } from 'react';
import Titles from '../../common/titles';
import { getResumes, deleteResume } from '../../../services/resumeService';
import { Link } from 'react-router-dom';
import { getCurrentUser } from "../../../services/userService";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { url } from '../../../config.json';

class TheTeam extends Component {
    state = { 
        resumes: [],
     }

     styles = {
         bg : {
           backgroundImage: 'linear-gradient(lightgray,  white)',
            borderRadius: '15px 15px 0 0'  
         },
         a: {
            color: 'black'
        }
     }

     async componentDidMount(){
        const { data } = await getResumes();
       if( data.length ) this.setState({ resumes: data })
    }
    
    handleResumeDelete = async (resumeId, e) => {
        e.preventDefault();

        Swal.fire({
            title: '?האם אתה בטוח',
            text: "!איש הקשר יימחק ממאגר המידע",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'כן, אני רוצה למחוק!',
            cancelButtonText:'בטל'
          }).then((result) => {
            if (result.isConfirmed) {
                let resumes = [...this.state.resumes];
                resumes = resumes.filter( resume => resume._id !== resumeId );
                this.setState({ resumes });
                deleteResume(resumeId);
                toast('איש הצוות נמחק');
            }
          })
      }

     generatePerson(){
         const { resumes } = this.state;
         const user = getCurrentUser();

       if ( resumes.length) {
           return (
                resumes.map(  resume => (
                    <div to={`/resume-page/${resume._id}`}
                          className="card col-12 col-sm-6 col-md-4 col-lg-3 p-2 mb-5"
                          key={resume._id}> 

                        <Link style={ this.styles }
                              to={`/resume-page/${resume._id}`}>
                            <img className="card-img-top" 
                                src={`${url}${resume.profileUrl}`} 
                                alt={resume.profileAlt}
                                style={ this.styles.bg }/>
                        </Link>

                        <div className="card-body px-0">
                            <Link to={`/resume-page/${resume._id}`}
                                  className='text-decoration-none text-dark'>
                                <h5 className="card-title text-right ">
                                    {resume.firstName} {resume.lastName}
                                </h5>
                                <p className="card-text text-right">{resume.subTitle}</p>
                            </Link>
                            {user && user.admin && 
                                    <span> <Link to={`/private-area/edit-resume-card/${resume._id}`} className='far fa-edit text-dark text-decoration-none'></Link> <span> | </span>
                        <a href="/" onClick={ (e) => { this.handleResumeDelete(resume._id, e) } } className='fas fa-trash-alt text-dark text-decoration-none'> </a>  
                      </span>
                     
                      }
                        </div>
                 </div>
                ))
           )
        }        
      return <p className="text-rtl">לא נמצאו אנשי צוות</p>
    }

    render() { 
        return ( 
            <div id="theTeam" className="theTeam container-fluid">
                <div className="container px-0">
                    <Titles titleBold='הצוות'
                            title= 'שלנו'
                            subTitle='אנחנו באנו אדריכלים שמים דגש על צוות איכותי ומקצועי'/>

                    <div className="center">
                        <div className="col-10">
                            <div className="row justify-content-between">
                                {this.generatePerson()}  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default TheTeam;