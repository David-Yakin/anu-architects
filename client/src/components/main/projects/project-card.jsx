import React from "react";
import { getCurrentUser } from "../../../services/userService";
import { Link } from "react-router-dom";
import { url } from "../../../config.json";

const ProjectCard = ({
  project,
  width,
  handleProjectDelete,
  changePublishStatus,
}) => {
  const user = getCurrentUser();
  return (
    <div className={width}>
      <Link to={`/project-page/${project._id}`}>
        <img
          src={`${url}${project.images.card.url}`}
          className="card-img-top"
          alt={project.images.card.alt}
        />
      </Link>

      <div className="card-body p-0">
        <div className="d-flex flex-row-reverse">
          <div className="col-10 px-0">
            <Link
              to={`/project-page/${project._id}`}
              className="text-decoration-none text-dark">
              <h4 className="card-title text-rtl m-0 ">{project.name}</h4>
              <p className="card-text text-right">
                <small className="text-muted">
                  {project.address.country} | {project.address.city} |{" "}
                  {project.year}
                </small>
              </p>
            </Link>
          </div>
        </div>
        <div className=" pt-1 px-0 d-flex flex-row-reverse">
          {user && user.isAdmin && (
            <span className="col-12 ">
              <hr className="m-0" />

              <Link
                to={`/private-area/edit-project-card/${project._id}`}
                className="far fa-edit text-dark text-decoration-none"></Link>
              <span> | </span>
              <a
                href="/"
                onClick={e => {
                  handleProjectDelete(project._id, e);
                }}
                className="fas fa-trash-alt text-dark text-decoration-none">
                {" "}
              </a>
              <span> | </span>
              <a
                href="/"
                className="far fa-eye text-dark text-decoration-none"
                onClick={e => {
                  changePublishStatus(project._id, e);
                }}>
                {" "}
              </a>
              {/* <hr className="mt-0 mb-2" /> */}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
