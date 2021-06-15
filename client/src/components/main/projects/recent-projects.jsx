import React, { Component } from "react";
import ALink from "../../common/a-link";
import ProjectCard from "./project-card";
import Titles from "../../common/titles";
import { getProjects } from "../../../services/projectService";
import { getUsers } from "../../../services/userService";
import { toast } from "react-toastify";
import {
  changePublishStatus,
  changeLikeStatus,
} from "../../../services/projectService";

class Recent extends Component {
  state = {
    projects: [],
    users: [],
  };

  async componentDidMount() {
    const projectsData = await (await getProjects()).data;
    const usersData = await (await getUsers()).data;
    if (projectsData.length && usersData)
      this.setState({
        projects: projectsData,
        users: usersData,
      });
  }

  changePublishStatus = async (projectId, e) => {
    e.preventDefault();
    let projects = [...this.state.projects];
    let project = projects.find(project => project._id === projectId);
    let status = project.isPublished;
    let changeStatus = !status;
    toast("ההרשאה עודכנה");
    this.setState({ project: (project.isPublished = changeStatus) });
    await changePublishStatus(projectId);
  };

  changeLikeStatus = async (projectId, e) => {
    e.preventDefault();
    let projects = [...this.state.projects];
    let project = projects.find(project => project._id === projectId);
    let status = project.isLiked;
    let changeStatus = !status;
    toast("ההרשאה עודכנה");
    this.setState({ project: (project.isLiked = changeStatus) });
    await changeLikeStatus(projectId);
  };

  generateProject() {
    let projects = [...this.state.projects];
    projects = projects.filter(project => {
      if (project.isLiked === true) return project;
      return null;
    });
    projects = projects.reverse();

    if (projects.length >= 4) {
      return (
        <div className="row">
          {projects.map((project, i) => {
            if (i < 4)
              return (
                <ProjectCard
                  key={project._id}
                  project={project}
                  width="card mb-3 col-lg-6 col-xl-6 py-0 px-2 border-0"
                  changePublishStatus={this.changePublishStatus}
                  changeLikeStatus={this.changeLikeStatus}
                />
              );
            return null;
          })}
        </div>
      );
    }
    <p>Sorry, no projects were found in the database</p>;
  }

  render() {
    return (
      <div className="recent-projects containr-fluid" id="recent-projects">
        <div className="container">
          <Titles
            titleBold="פרויקטים"
            title="אחרונים"
            subTitle="טעימה  מהפרויקטים האחרונים שסטודיו אנו אדריכלים עבד עליהם בשנה האחרונה "
          />

          {this.generateProject()}

          <div className="center pb-4">
            <ALink
              to="/projects/projects-search-page"
              text="לפרויקטים נוספים"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Recent;
