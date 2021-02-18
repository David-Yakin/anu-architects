import http from "./httpService";
import { apiUrl } from "../config.json";

export function deleteProject(projectId){
  return http.delete(`${apiUrl}/projects/${projectId}`);
}

export function getMyProject(projectId) {
  return http.get(`${apiUrl}/projects/project-page/${projectId}`);
}

export function createProject(project) {
  return http.post(`${apiUrl}/projects`, project);
}

export function editProject(project) {
  const projectId = project._id;
  delete project._id;
  return http.put(`${apiUrl}/projects/private-area/edit-project-card/${projectId}`, project);
}

export function getProject(projectId) {
  return http.get(`${apiUrl}/projects/private-area/edit-project-card/${projectId}`);
}

export async function getProjects(){
  return http.get(`${apiUrl}/projects/private-area/projects-search-page`);
}

