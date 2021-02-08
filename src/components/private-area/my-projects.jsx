import React, { Component } from 'react';
import Titles from '../common/titles';
import ProjectCard from '../main/projects/project-card';
import { getProjects, changProjectLike } from '../../services/projectService';
import { toast } from 'react-toastify';

class MyProjects extends Component {
    state = { 
        projects: [],
     }

     async componentDidMount(){
        const { data } = await getProjects();
        this.setState({ projects : data});
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
        const { projects } = this.state;

        if(projects.length){
            return (
                <div className="row">
                    {projects.map( project => project.isLiked &&
                        < ProjectCard 
                        key={project._id} 
                        project={project} 
                        width={'card mb-3  col-12 col-md-6 col-lg-4 py-0 px-2 border-0'}
                        handleProjectDelete={this.handleProjectDelete}
                        handleLike={this.handleLike}
                        />
                    )}
                </div>
            )
        } 
        return (
            <div className="center">
                <div className="row col-8 text-rtl pt-4">
                    <h4>מצטערים לא נמצאו פרויקטים מועדפים במאגר המידע</h4>
                    <p>חפש באתר את הפרויקטים המועדפים עליך ולחץ על סימן הלייק כדי להוסיף אותם לפרויקטים המועדפים  </p> 
                </div>
            </div>
        )
    }
    //  generateProject( ){
    //     const { projects } = this.state;

    //     if(projects.length){
    //         return (
    //             <div className="row">
    //                 {projects.map( project => project.isLiked &&
    //                     < ProjectCard 
    //                     key={project._id} 
    //                     project={project} 
    //                     width={'card mb-3 col-4 py-0 px-2 border-0'}
    //                     handleProjectDelete={this.handleProjectDelete}
    //                     handleLike={this.handleLike}
    //                     />
    //                 )}
    //             </div>
    //         )
    //     } 
    //     return (
    //         <div className="center">
    //             <div className="row col-8 text-rtl pt-4">
    //                 <h4>מצטערים לא נמצאו פרויקטים מועדפים במאגר המידע</h4>
    //                 <p>חפש באתר את הפרויקטים המועדפים עליך ולחץ על סימן הלייק כדי להוסיף אותם לפרויקטים המועדפים  </p> 
    //             </div>
    //         </div>
    //     )
    // }

    render() { 
        return ( 
            <div className="container">

                <Titles titleBold='האזור'
                        title= 'האישי'
                        subTitle='כאן תוכל לראות את הפרויקטים המועדפים עליך' />

                {this.generateProject()}
            </div>
         );
    }
}
 
export default MyProjects;