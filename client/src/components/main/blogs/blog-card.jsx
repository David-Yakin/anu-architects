import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../../services/userService";
import { url } from "../../../config.json";

const BlogCard = ({ blog, handleBlogDelete, changePublishStatus }) => {
  const user = getCurrentUser();
  return (
    <div className="col-12 post horizontal_article shadow mb-4 zoom">
      <div className="row">
        <div className="col-4 center px-0">
          <Link to={`/blog-page/${blog._id}`}>
            <img
              className="img-fluid"
              src={`${url}${blog.cardUrl}`}
              alt={blog.cardAlt}
            />
          </Link>
        </div>
        <div className="post_text col-8 text-right">
          <div className="p-2">
            <Link
              to={`/blog-page/${blog._id}`}
              className="text-dark text-decoration-none">
              <h2 className="">{blog.title}</h2>
            </Link>
            <Link className="a-herf text-rtl" to={`/blog-page/${blog._id}`}>
              {" "}
              <hr />
            </Link>
            <Link
              to={`/blog-page/${blog._id}`}
              className="text-dark text-decoration-none">
              <h6>{blog.subTitle}</h6>
            </Link>
            <Link className="a-herf text-rtl" to={`/blog-page/${blog._id}`}>
              ...פרטים נוספים
            </Link>
            <div>
              <span>
                {user && user.isBloger && (
                  <Link
                    to={`/private-area/edit-blog-card/${blog._id}`}
                    className="far fa-edit text-dark text-decoration-none"></Link>
                )}
                {user && user.isAdmin && (
                  <>
                    <span> | </span>
                    <a
                      href="/"
                      onClick={e => {
                        handleBlogDelete(blog._id, e);
                      }}
                      className="fas fa-trash-alt text-dark text-decoration-none">
                      {" "}
                    </a>
                    <span> | </span>
                    <a
                      href="/"
                      className={
                        blog.isPublished
                          ? "far fa-eye text-dark text-decoration-none"
                          : "fas fa-eye-slash text-decoration-none text-dark"
                      }
                      onClick={e => {
                        changePublishStatus(blog._id, e);
                      }}>
                      {" "}
                    </a>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
