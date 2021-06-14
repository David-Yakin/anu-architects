import React from "react";
import { Link } from "react-router-dom";

// import { getCurrentUser } from "../../../services/userService";
// import Titles from '../../common/titles';
// import ALink from '../../common/a-link';
// // import { getUser  } from "../../../services/userService"
// // import Swal from 'sweetalert2';
// // import { toast } from 'react-toastify'

const EditUserProjects = ({ project, index, toggleProjects }) => {
  return (
    <div>
      <div className="accordion">
        <div
          className="user-project d-flex flex-row-reverse"
          onClick={() => toggleProjects(index)}>
          <h2 className="mb-0 text-rtl user-title col-10 p-0">
            {project.name}
          </h2>
          <Link
            to={`/private-area/edit-project-card/${project._id}`}
            className="btn btn-outline-danger col-2">
            פרסם
          </Link>
        </div>
        <hr className="m-0 border-dark" />
        <div className={project.isOpen ? "qna-open m-0" : "qna-close m-0"}>
          <div className="card-body row p-0">
            <div className="card-text col-12 text-right">
              <Link to="/" className="user-item">
                חוזים
              </Link>
              <hr className="m-0" />
              <Link to="/" className="user-item">
                רישוי
              </Link>
              <hr className="m-0" />
              <Link to="/" className="user-item">
                מומחים ויועצים
              </Link>
              <hr className="m-0" />
              <Link to="/" className="user-item">
                תוכניות ארכיטקטיות
              </Link>
              <hr className="m-0" />
              <Link to="/" className="user-item">
                סקיצות
              </Link>
              <hr className="m-0" />
              <Link to="/" className="user-item">
                הדמיות
              </Link>
              <hr className="m-0" />
              <Link to="/" className="user-item">
                תמונות רפרנס
              </Link>
              <hr className="m-0" />
              <Link to="/" className="user-item">
                תמונות לפני
              </Link>
              <hr className="m-0" />
              <Link to="/" className="user-item">
                תמונות מהבניה והשיפוץ
              </Link>
              <hr className="m-0" />
              <Link to="/" className="user-item">
                תמונות אחרי הבניה והשיפוץ
              </Link>
              <hr className="m-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProjects;
