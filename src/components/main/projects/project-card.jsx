import React from 'react';
import { getCurrentUser } from "../../../services/userService";
import { Link } from 'react-router-dom'
import { url } from '../../../config.json';

const ProjectCard = ({project, width, handleProjectDelete}) =>{
    const user = getCurrentUser();
    return (
        <div className={width}>
             
        <Link to={`/project-page/${project._id}`}>
            <img src={`${url}${project.cardUrl}`} 
                 className="card-img-top" 
                 alt={project.cardAlt} />
        </Link>   

        <div className="card-body p-0">
            <div className="d-flex flex-row-reverse justify-content-between">

                <div className='col-10 px-0'>
                          
                    <h4 className="card-title text-rtl m-0 ">{project.name}</h4>
                    <p className="card-text text-right">
                        <small className="text-muted">{project.country} | {project.city} | {project.year}</small>
                    </p>
                             
                </div>

                    <div className="col-2 pt-1 px-0">
                      
                      {user && user.admin && 
                      <span>
                        <Link to={`/private-area/edit-project-card/${project._id}`} className='far fa-edit text-dark text-decoration-none'></Link> 
                        <span> | </span>
                        <a href="/" onClick={ e => { handleProjectDelete(project._id, e) } } className='fas fa-trash-alt text-dark text-decoration-none'> </a>  
                      </span>
                     
                      }
                    </div>
                    
            </div>   
        </div>
                    
    </div> 
    )
}
 
export default ProjectCard;
