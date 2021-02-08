import React, { Component } from 'react';
import ALink from '../../common/a-link';
import ProjectCard from './project-card';
import Titles from '../../common/titles';
import { getProjects, changProjectLike } from '../../../services/projectService';
import { getUsers } from '../../../services/userService';
import { toast } from 'react-toastify';

class Recent extends Component {

    state = { 
            projects:[] ,
            users:[],
     }

     async componentDidMount(){
    //     const { data } = await getProjects();
    //    if( data.length ) this.setState({ projects: data })
       const projectsData = await (await getProjects()).data;
       const usersData = await (await getUsers()).data
       if( projectsData.length && usersData ) this.setState({ 
        projects: projectsData,
        users: usersData
     });
    }

    handleLike = async(projectId) => {
        let projects = [...this.state.projects];
        let project = projects.find( project => project._id === projectId);

        if(!project.isLiked) {
            this.setState({ project: project.isLiked = true })
            toast('הפרוייטק נבחר לרשימת המועדפים שלך');
            return changProjectLike(projectId);
        } 
        this.setState({ project: project.isLiked = false })
        toast('הפרוייטק הוצא מרשימת המועדפים שלך');
        changProjectLike(projectId);
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
                                      handleLike={this.handleLike}
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