import React, { Component } from 'react';
import ALink from '../../common/a-link';
import ProjectCard from './project-card';
import Titles from '../../common/titles';
import { getProjects } from '../../../services/projectService';
import { getUsers } from '../../../services/userService';

class Recent extends Component {

    state = { 
            projects:[] ,
            users:[],
     }

     async componentDidMount(){
       const projectsData = await (await getProjects()).data;
       const usersData = await (await getUsers()).data
       if( projectsData.length && usersData ) this.setState({ 
        projects: projectsData,
        users: usersData
     });
    }

    generateProject( ){
        let { projects} = this.state;
        projects = projects.reverse();
        projects = projects.filter((project,i)=>{
            return i < 4;
        }) 

        if(projects.length){
            return (
                <div className="row">
                    {projects.map( project => 
                        < ProjectCard key={project._id} 
                                      project={project} 
                                      width= 'card mb-3 col-lg-6 col-xl-6 py-0 px-2 border-0'/>
                    )}
                </div>
            )
        } 
        <p>Sorry, no projects were found in the database</p>
    }

    render() { 
        return ( 
            <div className="recent-projects containr-fluid" id="recent-projects">
                <div className="container">

                    <Titles titleBold='פרויקטים'
                            title= 'אחרונים'
                            subTitle='טעימה  מהפרויקטים האחרונים שסטודיו אנו אדריכלים עבד עליהם בשנה האחרונה '/>

                    {this.generateProject()}

                    <div className="center pb-4">
                        <ALink to='/projects/projects-search-page' text='לפרויקטים נוספים' />    
                    </div>
                          
                </div>
            </div>
         );
    }
}
 
export default Recent;