import http from "./httpService";
import { apiUrl } from "../config.json";

export function createProject(project) {
  return http.post(`${apiUrl}/projects`, project, {
    onUploadProgress: ProgressEvent =>
      console.log(
        `upload progress: ${Math.round(
          (ProgressEvent.loaded / ProgressEvent.total) * 100
        )}%`
      ),
  });
}

export function deleteProject(projectId) {
  return http.delete(`${apiUrl}/projects/${projectId}`);
}

export function editProject(project, id) {
  return http.put(`${apiUrl}/projects/${id}`, project, {
    onUploadProgress: ProgressEvent =>
      console.log(
        `upload progress: ${Math.round(
          (ProgressEvent.loaded / ProgressEvent.total) * 100
        )}%`
      ),
  });
}

export function getProject(projectId) {
  return http.get(`${apiUrl}/projects/${projectId}`);
}

export async function getProjects() {
  return http.get(`${apiUrl}/projects/private-area/projects-search-page`);
}

export function getMyProject(userId) {
  return http.get(`${apiUrl}/projects/my-projects/${userId}`);
}

export function changePublishStatus(projectId) {
  return http.patch(`${apiUrl}/projects/changePublishStatus/${projectId}`);
}

export function changeLikeStatus(projectId) {
  return http.patch(`${apiUrl}/projects/changeLikeStatus/${projectId}`);
}

export function uploadImage(image, projectId, route) {
  return http.patch(`${apiUrl}/projects/${route}/${projectId}`, image);
}

export function deleteImage(images, projectId, route) {
  return http.patch(`${apiUrl}/projects/${route}/${projectId}`, images);
}

export function editImage(projectId, image, route) {
  return http.patch(`${apiUrl}/projects/${route}/${projectId}`, image);
}
