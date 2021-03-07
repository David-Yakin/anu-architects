import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from "../../../services/userService";
import { url } from '../../../config.json';

const BlogCard = ({blog, handleBlogDelete }) => {
    const user = getCurrentUser();
    return (
        <div className="col-12 post horizontal_article shadow mb-4 zoom">
            <div className="row">
                <div className="col-4 center px-0">
                    <img className="img-fluid" 
                         src={`${url}${blog.cardUrl}`} 
                         alt={blog.cardAlt}/>
                </div>
                <div className="post_text col-8 text-right">
                    <div className="p-2">
                        <h2 className="">
                            {blog.title}
                        </h2>
                        <hr/>
                        <h6>{blog.subTitle}</h6>
                        <Link className='a-herf text-rtl' to={`/blog-page/${blog._id}`}>...פרטים נוספים</Link>
                    <div>
                        {user && user.isBloger && 
                      <span>
                        <Link to={`/private-area/edit-blog-card/${blog._id}`} className='far fa-edit text-dark text-decoration-none'></Link> 
                        <span> | </span>
                        <a href="/" onClick={ e => { handleBlogDelete(blog._id, e) } } className='fas fa-trash-alt text-dark text-decoration-none'> </a>    
                      </span>
                      }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default BlogCard;
