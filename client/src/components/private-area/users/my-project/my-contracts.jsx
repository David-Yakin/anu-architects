import React, { Component } from "react";
import { getProject } from "../../../../services/projectService";
import Titles from "../../../common/titles";
import { url } from "../../../../config.json";

class MyContracts extends Component {
  state = {
    componentDidMount: false,
    project: " ",
  };

  async componentDidMount() {
    const projectId = this.props.match.params.id;
    let { data } = await getProject(projectId);
    this.setState({ project: data, componentDidMount: true });
  }

  generateContracts() {
    let contracts = this.state.project.files.contracts;
    if (contracts.length) {
      return contracts.map((contrct, i) => {
        return (
          <div
            className="card mb-3 col-12 col-md-6 col-lg-4 py-0 px-2 border-0"
            key={i}>
            <img
              src={`${url}${contrct.url}`}
              className="card-img-top"
              alt={contrct.name}
            />
            <div className="card-body">
              <div className="d-flex row-reverse"></div>
            </div>
          </div>
        );
      });
    }
    return "no contracts!";
  }

  render() {
    const { project, componentDidMount } = this.state;

    if (componentDidMount) {
      return (
        <div className="container">
          <Titles
            titleBold="חוזים"
            title=" "
            subTitle={`כאן תוכל לראות את החוזים של הפרויקט ${project.name}`}
          />
          <div className="center">
            <div className="col-12">{this.generateContracts()}</div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default MyContracts;
