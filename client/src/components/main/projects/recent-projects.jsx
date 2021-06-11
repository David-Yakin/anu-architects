import React, { Component } from "react";
import ALink from "../../common/a-link";
import ProjectCard from "./project-card";
import Titles from "../../common/titles";
import { getProjects } from "../../../services/projectService";
import { getUsers } from "../../../services/userService";
import { toast } from "react-toastify";
import {
  changePublishStatus,
  deleteProject,
} from "../../../services/projectService";
import Swal from "sweetalert2";

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

  handleProjectDelete = async (projectId, e) => {
    e.preventDefault();
    Swal.fire({
      title: "?האם אתה בטוח",
      text: "!הפרויקט יימחק ממאגר המידע",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, אני רוצה למחוק!",
      cancelButtonText: "בטל",
    }).then(result => {
      if (result.isConfirmed) {
        let projects = [...this.state.projects];
        projects = projects.filter(project => project._id !== projectId);
        this.setState({ projects });
        deleteProject(projectId);
        toast("הפרויקט נמחק");
      }
    });
  };

  generateProject() {
    let projects = [...this.state.projects];
    projects = projects.filter(project => {
      if (project.isPublished === true) return project;
      return null;
    });
    projects = projects.reverse();

    if (projects.length >= 4) {
      return (
        <div className="row">
          {projects.map(project => (
            <ProjectCard
              key={project._id}
              project={project}
              width="card mb-3 col-lg-6 col-xl-6 py-0 px-2 border-0"
              handleProjectDelete={this.handleProjectDelete}
              changePublishStatus={this.changePublishStatus}
            />
          ))}
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
