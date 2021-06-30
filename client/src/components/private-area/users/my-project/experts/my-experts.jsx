import React, { Component } from "react";
import SearchInput from "../../../../common/search-input";
import Titles from "../../../../common/titles";
import { getCurrentUser } from "../../../../../services/userService";
// import { getDate } from '../../services/timeService';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import { getProject } from "../../../../../services/projectService";

class MyExperts extends Component {
  state = {
    categories: [],
    project: "",
    experts: [],
  };

  async componentDidMount() {
    let project = this.props.match.params.id;
    let { data } = await getProject(project);
    let experts = data.files.experts;
    let categories = [];
    experts.map(expert => categories.push(expert.category));
    this.setState({ project: data, experts, categories });
  }

  // async handleChange(e) {
  //   const { data } = await getUsers();
  //   let users = data;
  //   const searchTerm = e.target.value;
  //   const filertUsers = users.filter(
  //     user =>
  //       user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       user.isBloger.toString().includes(searchTerm)
  //   );
  //   this.setState({ users: filertUsers });
  // }

  // handleExpertDelete = async (userId, e) => {
  //   e.preventDefault();
  //   Swal.fire({
  //     title: "?האם אתה בטוח",
  //     text: "!המשתמש יימחק ממאגר המידע",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "כן, אני רוצה למחוק!",
  //     cancelButtonText: "בטל",
  //   }).then(result => {
  //     if (result.isConfirmed) {
  //       let users = [...this.state.users];
  //       users = users.filter(user => user._id !== userId);
  //       this.setState({ users });
  //       // deleteUser(userId);
  //       toast("המשתמש נמחק");
  //     }
  //   });
  // };

  generateTable() {
    const { project, experts } = this.state;

    if (experts.length) {
      return (
        <table className="table text-rtl">
          <thead>
            <tr>
              <th scope="col">מס'</th>
              <th scope="col">שם פרטי</th>
              <th scope="col">שם משפחה</th>
              <th scope="col">טלפון</th>
              <th scope="col">קטגוריה</th>
              <th scope="col">מחק</th>
            </tr>
          </thead>
          <tbody>
            {experts.map((expert, index) => (
              <tr key={index}>
                <td>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/private-area/users/my-project/experts/${project._id}/${expert._id}`}>
                    {index + 1}
                  </Link>
                </td>
                <td>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/private-area/users/my-project/experts/${project._id}/${expert._id}`}>
                    {expert.firstName}
                  </Link>
                </td>
                <td>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/private-area/users/my-project/experts/${project._id}/${expert._id}`}>
                    {expert.lastName}
                  </Link>
                </td>
                <td>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/private-area/users/my-project/experts/${project._id}/${expert._id}`}>
                    {expert.phone}
                  </Link>
                </td>
                <td>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/private-area/users/my-project/experts/${project._id}/${expert._id}`}>
                    {expert.category.text}
                  </Link>
                </td>
                <td>
                  <a
                    href="/"
                    onClick={e => {
                      this.handleExpertDelete(expert._id, e);
                    }}
                    className="fas fa-user-slash text-dark text-decoration-none">
                    {" "}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <div className="center">
        <div className="row col-8 text-rtl pt-4">
          <h4>מצטערים לא נמצאו יועצים במאגר המידע</h4>
        </div>
      </div>
    );
  }

  render() {
    const user = getCurrentUser();
    if (!user | (user.isAdmin === false))
      return <Redirect to="/private-area/sign-in" />;
    const { categories, project } = this.state;
    if (user && user.isAdmin | (user._id === project.userID)) {
      if (project._id !== undefined)
        return (
          <div>
            <Titles
              titleBold="מומחים"
              title="ויועצים"
              subTitle="כאן תוכל לחפש ליצור ולמחוק מומחים ויועצים של הפרויקט "
            />

            <div className="container">
              <div className="center">
                <div className="col-10">
                  <SearchInput
                    categories={categories}
                    placeholder="חפש יועץ"
                    handleChange={e => {
                      this.handleChange(e);
                    }}
                  />
                </div>
              </div>
              {this.generateTable()}

              <div className="center pb-3">
                <Link
                  to={`/private-area/project/CreateExpert/${this.props.match.params.id}`}
                  className="btn btn-outline-success border border-dark mt-2 ">
                  &#10133; צור מומחה או יועץ חדש
                </Link>
              </div>
            </div>
          </div>
        );
      return "Loading Project";
    }
  }
}

export default MyExperts;
