import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../../services/userService";

const EditUserProjects = ({
  project,
  index,
  toggleProjects,
  handleProjectDelete,
}) => {
  const user = getCurrentUser();

  if (project)
    return (
      <div>
        <div className="accordion">
          <div
            className="user-project d-flex flex-row-reverse justify-content-between"
            onClick={() => toggleProjects(index)}>
            <h2 className="mb-0 text-rtl user-title col-8 p-0">
              {project.name}
            </h2>

            {user && user.isAdmin && project.isPublished !== true && (
              <Link
                to={`/private-area/edit-project-card/${project._id}`}
                className="btn btn-outline-danger col-2">
                פרסם
              </Link>
            )}

            {user && user.isAdmin && (
              <a
                href="/"
                onClick={e => {
                  handleProjectDelete(project._id, e);
                }}
                className="btn btn-outline-danger col-2 mr-2">
                מחק
              </a>
            )}
          </div>
          <hr className="m-0 border-dark" />
          <div className={project.isOpen ? "qna-open m-0" : "qna-close m-0"}>
            <div className="card-body row p-0">
              <div className="card-text col-12 text-right">
                <Link
                  to={`/private-area/project/contracts/${project._id}`}
                  className="user-item">
                  חוזים
                </Link>
                <hr className="m-0" />
                <Link
                  to={`/private-area/project/licensing/${project._id}`}
                  className="user-item">
                  רישוי
                </Link>
                <hr className="m-0" />
                <Link
                  to={`/private-area/project/experts/${project._id}`}
                  className="user-item">
                  מומחים ויועצים
                </Link>
                <hr className="m-0" />
                <Link
                  to={`/private-area/project/plans/${project._id}`}
                  className="user-item">
                  תוכניות ארכיטקטיות
                </Link>
                <hr className="m-0" />
                <Link
                  to={`/private-area/project/sketches/${project._id}`}
                  className="user-item">
                  סקיצות
                </Link>
                <hr className="m-0" />
                <Link
                  to={`/private-area/project/imaging/${project._id}`}
                  className="user-item">
                  הדמיות
                </Link>
                <hr className="m-0" />
                <Link
                  to={`/private-area/project/references/${project._id}`}
                  className="user-item">
                  תמונות רפרנס
                </Link>
                <hr className="m-0" />
                <Link
                  to={`/private-area/project/before/${project._id}`}
                  className="user-item">
                  תמונות לפני
                </Link>
                <hr className="m-0" />
                <Link
                  to={`/private-area/project/constraction/${project._id}`}
                  className="user-item">
                  תמונות מהבניה והשיפוץ
                </Link>
                <hr className="m-0" />
                <Link
                  to={`/private-area/project/gallery/${project._id}`}
                  className="user-item">
                  גלריית תמונות
                </Link>
                <hr className="m-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return "No projects";
};

export default EditUserProjects;
