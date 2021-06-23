import React, { Component } from "react";
import MyContracts from "./users/my-project/my-contracts";
import MySketchs from "./users/my-project/my-sketchs";
import MyLicensing from "./users/my-project/my-licensing";
import MyExperts from "./users/my-project/my-experts";
import MyPlans from "./users/my-project/my-plans";
import MyImaging from "./users/my-project/my-imaging";
import MyReferences from "./users/my-project/my-references";
import MyBefore from "./users/my-project/my-before";
import MyConstraction from "./users/my-project/my-constraction";
import MyGallery from "./users/my-project/my-gallery";

import UploadReferance from "./users/my-project/upload-referance";
import UploadPlans from "./users/my-project/upload-plans";
import UploadSketches from "./users/my-project/upload-sketches";
import UploadImaging from "./users/my-project/upload-imaging";

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
        </Switch>

        <div className="col-11 col-xl-10 p-0">
          <Switch>
            <Route
              path="/private-area/update-user/:id"
              component={UpdateUser}
            />

            <Route
              path="/private-area/project/contracts/:id"
              component={MyContracts}
            />
            <Route
              path="/private-area/project/licensing/:id"
              component={MyLicensing}
            />
            <Route
              path="/private-area/project/experts/:id"
              component={MyExperts}
            />

            <Route path="/private-area/project/plans/:id" component={MyPlans} />
            <ProtectedRoute
              path="/private-area/project/uploadPlans/:id"
              component={UploadPlans}
              title={"isAdmin"}
            />

            <Route
              path="/private-area/project/sketches/:id"
              component={MySketchs}
            />
            <ProtectedRoute
              path="/private-area/project/uploadSketches/:id"
              component={UploadSketches}
              title={"isAdmin"}
            />

            <Route
              path="/private-area/project/imaging/:id"
              component={MyImaging}
            />
            <ProtectedRoute
              path="/private-area/project/uploadImaging/:id"
              component={UploadImaging}
              title={"isAdmin"}
            />

            <Route
              path="/private-area/project/references/:id"
              component={MyReferences}
            />
            <ProtectedRoute
              path="/private-area/project/uploadReferance/:id"
              component={UploadReferance}
              title={"isAdmin"}
            />

            <Route
              path="/private-area/project/before/:id"
              component={MyBefore}
            />

            <Route
              path="/private-area/project/constraction/:id"
              component={MyConstraction}
            />

            <Route
              path="/private-area/project/gallery/:id"
              component={MyGallery}
            />

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
