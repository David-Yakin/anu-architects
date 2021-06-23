import React, { Component } from "react";
import Titles from "../../common/titles";
import SearchInput from "../../common/search-input";
import BlogCard from "./blog-card";
import { getBlogs, deleteBlog } from "../../../services/blogService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

class Blogs extends Component {
  state = {
    categories: [
      { value: "", text: "כולם" },
      { value: "ארכיטקטורה", text: "ארכיטקטורה" },
      { value: "עיצוב פנים", text: "עיצוב פנים" },
      { value: "נגרות", text: "נגרות" },
    ],

    blogs: [],
  };

  async componentDidMount() {
    const { data } = await getBlogs();
    if (data.length) this.setState({ blogs: data });
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

  //   changePublishStatus = async (blogId, e) => {
  //     e.preventDefault();
  //     let blogs = [...this.state.blogs];
  //     let blog = blogs.find(blog => blog._id === blogId);
  //     let status = blog.isPublished;
  //     let changeStatus = !status;
  //     toast("ההרשאה עודכנה");
  //     this.setState({ blog: (blog.isPublished = changeStatus) });
  //     await changePublishStatus(blogId);
  //   };

  async handleChange(e) {
    const { data } = await getBlogs();
    let blogs = data;
    const searchTerm = e.target.value;
    const filertBlogs = blogs.filter(
      blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ blogs: filertBlogs });
  }

  generateBlogs() {
    const { blogs } = this.state;
    if (blogs.length)
      return (
        <div className="row px-0 mx-0">
          {blogs.map(blog => {
            if (blog.isPublished)
              return (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  handleBlogDelete={this.handleBlogDelete}
                />
              );
            return null;
          })}
        </div>
      );
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
