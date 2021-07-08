import React, { Component } from "react";
import Titles from "../../common/titles";
import ProjectCard from "./project-card";
import SearchInput from "../../common/search-input";
import {
  getProjects,
  changePublishStatus,
  changeLikeStatus,
} from "../../../services/projectService";
import { toast } from "react-toastify";
import { getUsers } from "../../../services/userService";

class Projects extends Component {
  state = {
    unmounted: false,
    categories: [],
    users: [],
    projects: [],
  };

  async componentDidMount() {
    const projectsData = await (await getProjects()).data;
    const usersData = await (await getUsers()).data;
    let categories = [];
    projectsData.map(project => {
      const array = [];
      categories.filter(category => {
        if (project.category.value === category.value)
          return array.push(project.category);
        return null;
      });
      if (array.length) return null;
      return categories.push(project.category);
    });
    if (projectsData.length && usersData)
      this.setState({
        projects: projectsData,
        users: usersData,
        unmounted: true,
        categories,
      });
  }

  async handleChange(e) {
    try {
      const { data } = await getProjects();
      let projects = data;
      const searchTerm = e.target.value;
      if (searchTerm === "all") return this.setState({ projects });
      const filertProjects = projects.filter(project => {
        if (project.isPublished)
          return (
            project.name.includes(searchTerm.toLowerCase()) ||
            project.category.value.toString().includes(searchTerm)
          );
        return null;
      });
      this.setState({ projects: filertProjects });
    } catch (error) {
      console.log(error);
    }
  }

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
                    "card mb-3 col-12 col-md-6 col-lg-4 py-0 px-2 border-0"
                  }
                  changePublishStatus={this.changePublishStatus}
                  changeLikeStatus={this.changeLikeStatus}
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
    const { categories, unmounted } = this.state;
    if (unmounted) {
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
    return null;
  }
}

export default Projects;
