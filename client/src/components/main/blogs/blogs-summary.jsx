import React, { Component } from 'react';
import ALink from '../../common/a-link';
import Titles from '../../common/titles';
import { getBlogs } from '../../../services/blogService';
import { url } from '../../../config.json';
import { Link } from 'react-router-dom';
class BlogsSummary extends Component {

    state = { 
        blogs : []
        }

    async componentDidMount(){
            const { data } = await getBlogs();
            if( data.length ) this.setState({ blogs: data })
        }

    render() { 
        const { blogs } = this.state;
        if( blogs.length >= 3){
        return ( 
            <div id="blog" className="blog container-fluid px-0">
                <div className="container">

                <Titles titleBold='בלוג ארכיטקטורה'
                        title= 'ועיצוב פנים'
                        subTitle='כאן תוכלו למצוא מאמרים בנושאי ארכיטקטורה עיצוב פנים בנייה ושיפוץ נכסים '/>

                    <div className="row">

                        <div className="articls_posts col-12 col-md-9">
                            
                            <div className="post horizontal_article shadow mb-4 zoom">
                                <div className="row">

                                    <div className="d-none d-sm-flex col-sm-5 col-lg-4 center">
                                        <Link to={`/blog-page/${blogs[0]._id}`}
                                              className='text-decoration-none text-dark'>
                                        <img className="img-fluid" src={`${url}${blogs[0].endImgUrl}`} alt={blogs[0].endImgAlt}/>
                                        </Link>
                                    </div>

                                    <div className="post_text col-12 col-sm-7 col-lg-8 text-right">
                                        <div className="p-2">
                                            <Link to={`/blog-page/${blogs[0]._id}`}
                                                  className='text-decoration-none text-dark'>
                                            <h2 className="display-4">{blogs[0].title}</h2>
                                            <hr/>
                                            <p>{blogs[0].subTitle}</p>
                                            </Link>
                                            <ALink to={`/blog-page/${blogs[0]._id}`}  className='text-rtl' text='...פרטים נוספים' />
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="post horizontal_article shadow mb-4 zoom ">
                                <div className="row">
                                    <div className="d-none d-sm-flex col-sm-5 col-lg-4 center">
                                        <Link to={`/blog-page/${blogs[1]._id}`}
                                              className="text-decoration-none text-dark">
                                        <img className="img-fluid" src={`${url}${blogs[1].endImgUrl}`} alt={blogs[1].titleImgAlt}/>
                                        </Link>
                                    </div>
                                    <div className="post_text col-12 col-sm-7 col-lg-8 text-right">
                                        <div className="p-2">
                                            <Link to={`/blog-page/${blogs[1]._id}`}
                                                  className="text-decoration-none text-dark">
                                            <h2 className="display-4">{blogs[1].title}</h2>
                                            <hr/>
                                            <p>{blogs[1].subTitle}</p>
                                            </Link>
                                            <ALink to={`/blog-page/${blogs[1]._id}`}  className='text-rtl' text='...פרטים נוספים' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="post vertical_article col-3 shadow  mb-4 p-0 zoom d-none d-md-block">
                            <div className="post_v_img">
                                <Link to={`/blog-page/${blogs[2]._id}`}
                                      className='text-decoration-none text-dark'>
                                <img className="img-fluid center" src={`${url}${blogs[2].endImgUrl}`} alt={blogs[2].titleImgAlt}/>
                                </Link>
                            </div>

                            <div className="text-right p-2">
                                <Link to={`/blog-page/${blogs[2]._id}`}
                                      className='text-decoration-none text-dark'>
                                <h2 className="display-4">{blogs[2].title}</h2>
                                <hr/>
                                <p>{blogs[2].subTitle}</p>
                                </Link>
                                <ALink to={`/blog-page/${blogs[2]._id}`}  className='text-rtl' text='...פרטים נוספים' />
                            </div>

                        </div>
                    </div>

                    <div className="center pb-4">
                        <ALink to='/blogs/blogs-search-page' text='למאמרים נוספים' />
                    </div>

                </div>
            </div>
         );
        }
        return null

    }
}
 
export default BlogsSummary;