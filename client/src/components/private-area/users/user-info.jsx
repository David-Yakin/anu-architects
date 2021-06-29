import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMyProject, deleteProject } from "../../../services/projectService";
import { getDate } from "../../../services/timeService";
import { getUser } from "../../../services/userService";
import ALink from "../../common/a-link";
import Titles from "../../common/titles";
import EditUserProjects from "./edit-user-projects";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

class UserInfo extends Component {
  state = {
    user: "",
    projects: [],
  };

  async componentDidMount() {
    let user = this.props.match.params.id;
    let userData = await getUser(user);
    user = userData.data;
    let projectsData = await getMyProject(user._id);
    let projects = projectsData.data;
    projects[0].isOpen = true;
    this.setState({ user, projects });
  }

  toggleProjects = index => {
    const { projects } = this.state;
    projects.map((item, i) => {
      if (i === index) return this.setState({ item: (item.isOpen = true) });
      return this.setState({ item: (item.isOpen = false) });
    });
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
    const { projects } = this.state;
    if (projects.length) {
      return (
        <div className="center">
          <div className="col-12 p-0">
            {projects.map((project, index) => {
              return (
                <EditUserProjects
                  key={index}
                  project={project}
                  index={index}
                  toggleProjects={this.toggleProjects}
                  handleProjectDelete={this.handleProjectDelete}
                />
              );
            })}
          </div>
        </div>
      );
    }
    return (
      <div className="center">
        <div className="row col-8 text-rtl pt-4">
          <h4>לא נמצאו פרויקטים במאגר המידע!</h4>
        </div>
      </div>
    );
  }

  generateTable() {
    const { user } = this.state;
    return (
      <table className="table text-rtl">
        <thead>
          <tr>
            <th scope="col">שם השדה</th>
            <th scope="col">פירוט</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>שם פרטי</td>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <td>שם משפחה</td>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <td>ת.ז</td>
            <td>{user.userID}</td>
          </tr>
          <tr>
            <td>מייל</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>טלפון</td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td>כתובת</td>
            <td>
              {user.address.street} {user.address.houseNumber}{" "}
              {user.address.city}, {user.address.zip} {user.address.country}
            </td>
          </tr>
          <tr>
            <td>נרשם בתאריך</td>
            <td>{getDate(user.createdAt)}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const { user } = this.state;
    if (user) {
      return (
        <div className="container">
          <Titles
            titleBold="דף"
            title="לקוח"
            subTitle="כאן תוכל לראות את פרטי הלקוח המלאים ואת הפרויקטים שלו. לחץ על הפרויקט על מנת להעלות אליו תמונות וקבצים "
          />
          <div className="center">{this.generateTable()}</div>
          <div className="accordion mb-4">{this.generateProject()}</div>

          <div className="center pb-3">
            <Link
              to={`/private-area/create-project-card/${this.props.match.params.id}`}
              className="btn btn-info border border-dark">
              &#10133; צור פרויקט חדש
            </Link>
          </div>

          <hr />

          <div className="center pb-3">
            <ALink to="/private-area/users" text="למשתמשים נוספים" />
          </div>
        </div>
      );
    }
    return "no user!";
  }
}

export default UserInfo;
