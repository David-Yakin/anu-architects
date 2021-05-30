import React, { Component } from 'react';
import ALink from '../../common/a-link';
import { getMyBlog } from '../../../services/blogService';
import { getDate } from '../../../services/timeService';
import { url } from '../../../config.json';

class Blog extends Component {
    state = { 
        blog: {}

     }

    async componentDidMount(){
        const blogId = this.props.match.params.id; 
        const { data } = await getMyBlog(blogId);
       if( data ) return this.setState({ blog: data });
    }

    render() { 
        const { blog } = this.state;
        return ( 
            <div className="article container-fluid blogs px-0">    

                <div className='pic-head'>
                    <img className="img-fluid px-0" src={`${url}${blog.titleImgUrl}`} 
                                                    alt={blog.titleImgAlt}/>
                    <span className="span-title mt-1 px-2">צילום: {blog.titleImgCredit}</span>  
                </div>        

                <div className="container">
                    <div className="row mt-0">
                        <div className="articleBody col-12 shadow">

                            <div className="text-rtl">
                                <h1 className="headline display-4">{blog.title}</h1>
                            </div>

                            <div className="text-rtl">
                                <h2 className="sub_headline font-weight-bold text-rtl">{blog.subTitle}</h2>
                            </div>

                            <div className="text-rtl pt-4">
                                <span className='font-weight-bold'> {blog.author}</span>
                            </div>

                            <hr className='m-1'/>

                            <div className="text-rtl pb-4">
                                <span className='text-rtl'>{getDate(blog.createdAt)} </span>
                            </div>

                            <div className="center">
                                <div className="col-10">
                                    <h4 className="Internal_title font-weight-bold text-rtl">{blog.firstInnerTitle}</h4>
                                        <div className="row">
                                             <div className='col-12'>
                                            <p className="text-rtl">{blog.firstP}</p>   
                                           </div> 
                                        </div>

                                        <div className="post_v_img">
                                            <img className="img-fluid center" src={`${url}${blog.landscapeImgUrl}`} alt={blog.landscapeImgAlt}/>
                                            <div className=" d-flex justify-content-between pb-2">
                                               <span className="text-secondary">צילום: {blog.landscapeImgCredit}</span> 
                                               <span className="text-secondary"> {blog.landscapeImgAlt}</span> 
                                            </div>
                                        </div>
                                      
                                        <p className="text-rtl">{blog.secondP}</p>
                                        <p className="text-rtl">{blog.thirdP}</p>
                                        <h4 className="Internal_title font-weight-bold text-rtl">{blog.secondInternalTitle}</h4>

                                        <div className="row">
                                            <div className="post_v_img col-12 col-md-8">
                                                <img className="img-fluid center" src={`${url}${blog.profileImgUrl}`} alt={blog.profileImgAlt} />
                                                <div className=" d-flex justify-content-between pb-2">
                                                    <span className="text-secondary">צילום: {blog.profileImgCredit}</span> 
                                                    <span className="text-secondary"> {blog.profileImgAlt}</span> 
                                                </div>

                                            </div>

                                            <div className=" col-12 col-md-4">
                                                <p className="text-rtl">{blog.foruthP}</p>
                                            </div>
                                        </div>
                                        
                                        <p className="text-rtl">{blog.fifthP}</p>
                                        <p className="text-rtl">{blog.sixthP}</p>

                                        <h4 className="Internal_title font-weight-bold text-rtl">{blog.thirdInnerTitle}</h4>

                                        <p className="text-rtl">{blog.seventhP}</p>
                                        
                                            <div className="post_v_img">
                                                <img className="img-fluid center" src={`${url}${blog.endImgUrl}`} alt={blog.endImgAlt} />

                                                <div className=" d-flex justify-content-between pb-2">
                                                    <span className="text-secondary">צילום: {blog.endImgCredit}</span> 
                                                    <span className="text-secondary"> {blog.endImgAlt}</span> 
                                                </div>

                                            </div>

                                        <p className="text-rtl">{blog.eighthP}</p>  
                                        <p className="text-rtl"> {blog.ninthP} <i className="fa fa-square"></i></p>

                                </div>
                            </div>

                            <div className="center">
                                <ALink to='/blogs/blogs-search-page'  text='למאמרים נוספים' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Blog;