import React, { Component } from "react";
import MyProjects from "./users/my-projects";
import MyContracts from "./users/my-contracts";
import MyBlueprints from "./users/my-blueprints";
import MySketchs from "./users/my-sketchs";
import Singin from "./users/sign-in";
import Singup from "./users/sign-up";
import Logout from "../../components/private-area/users/logout";
import SideBar from "./side-bar/side-bar-container";
import CreateProject from "../main/projects/create-project-card";
import EditProject from "../main/projects/edit-project-card";
import ProjectsSearch from "../main/projects/projects-search-page";
import CreateBlog from "../main/blogs/create-blog-card";
import EditBlog from "../main/blogs/edit-blog-card";
import BlogsSearch from "../main/blogs/blogs-search-page";
import CreatResume from "../main/resumes/create-resume-card";
import EditResume from "../main/resumes/edit-resume-card";
import resumesSearch from "../main/resumes/resume-search-page";
import Users from "./users/users";
import ProtectedRoute from "../common/protectedRoute";
import { Switch, Route } from "react-router-dom";
import Qna from "../main/qna/qna";
import createQna from "../main/qna/creat-qna";
import EditQna from "../main/qna/edit-qna";
import UpdateUser from "./users/update-user";
import { getCurrentUser } from "../../services/userService";
import ForgotPassword from "./users/forgot-password";
import ResetPassword from "./users/reset-password";
import UserInfo from "./users/user-info";

class Main extends Component {
  state = {};

  render() {
    const user = getCurrentUser();
    return (
      <React.Fragment>
        {user && <SideBar />}

        <Switch>
          <Route path="/private-area/sign-in" component={Singin} />
          <Route path="/private-area/sign-up" component={Singup} />
          <Route
            path="/private-area/forgot-password"
            component={ForgotPassword}
          />
          <Route
            path="/private-area/reset-password/:id/:token"
            component={ResetPassword}
          />
          <Route path="/private-area/my-projects" component={MyProjects} />
        </Switch>

        <div className="col-11 col-xl-10 p-0">
          <Switch>
            <Route
              path="/private-area/update-user/:id"
              component={UpdateUser}
            />
            <Route path="/private-area/my-contracts" component={MyContracts} />
            <Route
              path="/private-area/my-blueprints"
              component={MyBlueprints}
            />
            <Route path="/private-area/my-sketchs" component={MySketchs} />
            <Route path="/private-area/logout" component={Logout} />

            <Route path="/private-area/users" component={Users} />

            <ProtectedRoute
              path="/private-area/create-project-card/:userID"
              component={CreateProject}
              title={"isAdmin"}
            />
            <ProtectedRoute
              path="/private-area/user/:id"
              component={UserInfo}
              title={"isAdmin"}
            />
            <ProtectedRoute
              path="/private-area/edit-project-card/:id"
              component={EditProject}
              title={"isAdmin"}
            />
            <ProtectedRoute
              path="/private-area/create-blog-card"
              component={CreateBlog}
              title={"isBloger"}
            />
            <ProtectedRoute
              path="/private-area/edit-blog-card/:id"
              component={EditBlog}
              title={"isBloger"}
            />
            <ProtectedRoute
              path="/private-area/create-resume-card"
              component={CreatResume}
              title={"isAdmin"}
            />
            <ProtectedRoute
              path="/private-area/edit-resume-card/:id"
              component={EditResume}
              title={"isAdmin"}
            />

            <ProtectedRoute
              path="/private-area/create-qna-card"
              component={createQna}
              title={"isAdmin"}
            />
            <ProtectedRoute
              path="/private-area/edit-qna-card/:id"
              component={EditQna}
              title={"isAdmin"}
            />

            <Route
              path="/private-area/projects-search-page"
              component={ProjectsSearch}
            />
            <Route
              path="/private-area/blogs-search-page"
              component={BlogsSearch}
            />
            <Route
              path="/private-area/resume-search-page"
              component={resumesSearch}
            />
            <Route path="/private-area/qna-search-page" component={Qna} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
