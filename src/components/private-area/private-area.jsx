import React, { Component } from 'react';
import MyProjects from './my-projects'
import MyContracts from './my-contracts'
import MyBlueprints from './my-blueprints'
import MySketchs from './my-sketchs'
import MyMessages from './my-messages'
import Singin from './sign-in';
import Singup from './sign-up';
import Logout from '../../components/private-area/logout';
import SideBar from './side-bar/side-bar-container';
import CreateProject from '../main/projects/create-project-card';
import EditProject from '../main/projects/edit-project-card';
import ProjectsSearch from '../main/projects/projects-search-page';
import CreateBlog from '../main/blogs/create-blog-card'
import EditBlog from '../main/blogs/edit-blog-card'
import BlogsSearch from '../main/blogs/blogs-search-page'
import CreatResume from '../main/resumes/create-resume-card';
import EditResume from '../main/resumes/edit-resume-card';
import resumesSearch from '../main/resumes/resume-search-page';
import Users from './users';
import ProtectedRoute from '../common/protectedRoute';
import { Switch, Route } from 'react-router-dom';
import Qna from '../main/qna/qna';
import createQna  from '../main/qna/creat-qna';
import EditQna  from '../main/qna/edit-qna';
import UpdateUser from './update-user';
import { getCurrentUser } from '../../services/userService';
import ForgotPassword from './forgot-password';
import ResetPassword from './reset-password';

class Main extends Component {

    state = {  }

    
    render() { 
            const user = getCurrentUser()
        return ( 
            
                <React.Fragment>
                {user && <SideBar />}

                <Switch>
                    <Route path='/private-area/sign-in' component={Singin}/>
                    <Route path='/private-area/sign-up' component={Singup}/>
                    <ForgotPassword path='/private-area/forgot-password' component={ForgotPassword}/>
                    <ResetPassword path='/private-area/reset-password/:id/:token' component={ResetPassword} />
                    <Route path='/private-area/my-projects' component={MyProjects}/>
                </Switch>    
                    
            <div className="col-11 col-xl-10 p-0">
                <Switch>
                    <Route path='/private-area/update-user/:id' component={UpdateUser}/>
                    <Route path='/private-area/my-contracts' component={MyContracts}/>
                    <Route path='/private-area/my-blueprints' component={MyBlueprints}/>
                    <Route path='/private-area/my-sketchs' component={MySketchs}/>
                    <Route path='/private-area/my-messages' component={MyMessages}/>
                    <Route path='/private-area/logout' component={Logout}/>

                    <Route path='/private-area/users' component={Users}/>

                    <ProtectedRoute path='/private-area/create-project-card' component={CreateProject} title={"admin"}/>
                    <ProtectedRoute path='/private-area/edit-project-card/:id' component={EditProject} title={"admin"}/>
                    <ProtectedRoute path='/private-area/create-blog-card' component={CreateBlog} title={"isBloger"}/>
                    <ProtectedRoute path='/private-area/edit-blog-card/:id' component={EditBlog} title={"isBloger"}/>
                    <ProtectedRoute path='/private-area/create-resume-card' component={CreatResume} title={"admin"}/>
                    <ProtectedRoute path='/private-area/edit-resume-card/:id' component={EditResume} title={"admin"}/>
                    
                    <ProtectedRoute path='/private-area/create-qna-card' component={createQna} title={"admin"}/>
                    <ProtectedRoute path='/private-area/edit-qna-card/:id' component={EditQna} title={"admin"}/>

                    <Route path='/private-area/projects-search-page' component={ProjectsSearch}/>
                    <Route path='/private-area/blogs-search-page' component={BlogsSearch}/>
                     <Route path='/private-area/resume-search-page' component={resumesSearch}/>
                     <Route path='/private-area/qna-search-page' component={Qna}/>
                     </Switch>  
                </div>

            </React.Fragment>
         );
    }
}
 
export default Main;

