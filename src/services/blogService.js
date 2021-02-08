import http from "./httpService";
import { apiUrl } from "../config.json";

export function getBlog(blogId) {
  return http.get(`${apiUrl}/blogs/private-area/edit-blog-card/${blogId}`);
}

export function editBlog(blog) {
  const blogId = blog._id;
  delete blog._id;
  return http.put(`${apiUrl}/blogs/private-area/edit-blog-card/${blogId}`, blog);
}

export function getMyBlog(blogId) {
  return http.get(`${apiUrl}/blogs/blog/${blogId}`);
}

export function createBlog(blog) {
  // console.log(blog);
  return http.post(`${apiUrl}/blogs`, blog);
}

export async function getBlogs(){
  return http.get(`${apiUrl}/blogs/blogs/blogs-search-page`);
}

export function deleteBlog(blogId){
  return http.delete(`${apiUrl}/blogs/${blogId}`);
}