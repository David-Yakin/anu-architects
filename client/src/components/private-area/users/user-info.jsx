import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDate } from "../../../services/timeService";
import { getUser } from "../../../services/userService";
import ALink from "../../common/a-link";
import Titles from "../../common/titles";
import EditUserProjects from "./edit-user-projects";

class UserInfo extends Component {
  state = {
    user: "",
  };

  async componentDidMount() {
    const user = this.props.match.params.id;
    const { data } = await getUser(user);
    this.setState({ user: data });
  }

  toggleProjects = index => {
    const { projects } = this.state.user;
    projects.map((item, i) => {
      if (i === index) return this.setState({ item: (item.open = true) });
      return this.setState({ item: (item.open = false) });
    });
  };

  generateProject() {
    const { projects } = this.state.user;
    if (projects.length) {
      return (
        <div className="row">
          {projects.map((project, index) => (
            <EditUserProjects key={index} project={project} />
          ))}
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

  render() {
    const { user } = this.state;
    if (user) {
      return (
        <div className="container">
          <Titles
            titleBold="דף"
            title="לקוח"
            subTitle="כאן תוכל לראות את פרטי הלקוח המלאים "
          />

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
