import React, { Component } from 'react';
import Titles from '../common/titles';
// import ProjectCard from '../main/projects/project-card';
import { getProjects } from '../../services/projectService';

class MyProjects extends Component {
    state = { 
        projects: [],
     }

     async componentDidMount(){
        const { data } = await getProjects();
        this.setState({ projects : data});
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
    //                     width={'card mb-3  col-12 col-md-6 col-lg-4 py-0 px-2 border-0'}
    //                     handleProjectDelete={this.handleProjectDelete}/>
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
                        subTitle='כאן תוכל לראות את התקדמות הפרויקטים שלך' />

                {/* {this.generateProject()} */}
            </div>
         );
    }
}
 
export default MyProjects;