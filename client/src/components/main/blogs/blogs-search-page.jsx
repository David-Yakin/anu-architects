import React, { Component } from "react";
import Titles from "../../common/titles";
import SearchInput from "../../common/search-input";
import BlogCard from "./blog-card";
import {
  getBlogs,
  deleteBlog,
  changePublishStatus,
} from "../../../services/blogService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../../services/userService";

class Blogs extends Component {
  state = {
    unmounted: false,
    categories: [],
    blogs: [],
  };

  async componentDidMount() {
    const { data } = await getBlogs();
    let categories = [];
    data.map(blog => {
      const array = [];
      categories.filter(category => {
        if (blog.category.value === category.value)
          return array.push(blog.category);
        return null;
      });
      if (array.length) return null;
      return categories.push(blog.category);
    });
    if (data.length)
      this.setState({
        blogs: data,
        unmounted: true,
        categories,
      });
  }

  async handleChange(e) {
    try {
      const { data } = await getBlogs();
      let blogs = [...data];
      const searchTerm = e.target.value;
      if (searchTerm === "all") return this.setState({ blogs });
      const filertblogs = blogs.filter(blog => {
        if (blog.isPublished)
          return (
            blog.title.includes(searchTerm.toLowerCase()) ||
            blog.category.value.toString().includes(searchTerm)
          );
        return null;
      });
      this.setState({ blogs: filertblogs });
    } catch (error) {
      console.error(error);
    }
  }

  handleBlogDelete = async (blogId, e) => {
    e.preventDefault();
    Swal.fire({
      title: "?האם אתה בטוח",
      text: "!המאמר יימחק ממאגר המידע",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן, אני רוצה למחוק!",
      cancelButtonText: "בטל",
    }).then(result => {
      if (result.isConfirmed) {
        let blogs = [...this.state.blogs];
        blogs = blogs.filter(blog => blog._id !== blogId);
        this.setState({ blogs });
        deleteBlog(blogId);
        toast("המאמר נמחק");
      }
    });
  };

  changePublishStatus = async (blogId, e) => {
    e.preventDefault();
    let blogs = [...this.state.blogs];
    let blog = blogs.find(blog => blog._id === blogId);
    let status = blog.isPublished;
    let changeStatus = !status;
    toast("ההרשאה עודכנה");
    this.setState({ blog: (blog.isPublished = changeStatus) });
    return await changePublishStatus(blogId);
  };

  generateBlogs() {
    const { blogs } = this.state;
    const user = getCurrentUser();

    if (blogs.length) {
      if (user.isBloger)
        return (
          <div className="row px-0 mx-0">
            {blogs.map(blog => {
              return (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  handleBlogDelete={this.handleBlogDelete}
                  changePublishStatus={this.changePublishStatus}
                />
              );
            })}
          </div>
        );
      return (
        <div className="row px-0 mx-0">
          {blogs.map(blog => {
            if (blog.isPublished)
              return (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  handleBlogDelete={this.handleBlogDelete}
                  changePublishStatus={this.changePublishStatus}
                />
              );
            return null;
          })}
        </div>
      );
    }
    return <p className="text-rtl">מצטערים לא נמצאו מאמרים במאגר המידע...</p>;
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="container-fluid">
        <div className="container px-0">
          <Titles
            titleBold="בלוג"
            title="אנו אדריכלים"
            subTitle="כאן תוכלו לחפש מאמרים, כתבות וחומר עיוני בנושאי ארכיטקטורה ועיצוב פנים"
          />

          <SearchInput
            categories={categories}
            placeholder="חפש מאמר"
            handleChange={e => {
              this.handleChange(e);
            }}
          />

          {this.generateBlogs()}
        </div>
      </div>
    );
  }
}

export default Blogs;
