import React, { Component } from "react";
import Titles from "../../common/titles";
import ProjectCard from "./project-card";
import SearchInput from "../../common/search-input";
import {
  getProjects,
  deleteProject,
  changePublishStatus,
} from "../../../services/projectService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getUsers } from "../../../services/userService";

class Projects extends Component {
  state = {
    categories: [
      { value: "", text: "כולם" },
      { value: "שיפוץ דירה", text: "שיפוץ דירה" },
    ],
    users: [],
    projects: [],
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

  async handleChange(e) {
    const { data } = await getProjects();
    let projects = data;
    const searchTerm = e.target.value;
    const filertProjects = projects.filter(
      project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ projects: filertProjects });
  }

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

  generateProject() {
    const { projects } = this.state;
    if (projects.length) {
      return (
        <div className="row">
          {projects.map(project => {
            if (project.isPublished) {
              return (
                <ProjectCard
                  key={project._id}
                  project={project}
                  width={
                    "card mb-3  col-12 col-md-6 col-lg-4 py-0 px-2 border-0"
                  }
                  handleProjectDelete={this.handleProjectDelete}
                  changePublishStatus={this.changePublishStatus}
                />
              );
            }
            return null;
          })}
        </div>
      );
    }
    return <p>Sorry, no projects were found in the database</p>;
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="containr-fluid">
        <div className="container">
          <Titles
            titleBold="הפרויקטים"
            title="של אנו אדריכלים"
            subTitle="כאן תוכל למצוא מגוון פרויקטים שצוות אנו אדריכלים עיצב במהלך השנים"
          />

          <SearchInput
            categories={categories}
            placeholder="חפש פרויקט"
            handleChange={e => {
              this.handleChange(e);
            }}
          />
        </div>

        <div className="center">
          <div className="col-10">{this.generateProject()}</div>
        </div>
      </div>
    );
  }
}

export default Projects;
