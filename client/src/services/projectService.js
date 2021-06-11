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
// export function createProject(project) {
//   return http.post(`${apiUrl}/projects`, project);
// }

// export function createProjectWithPics(project) {
//   return http.post(`${apiUrl}/projects`, project, {
//     onUploadProgress: ProgressEvent =>
//       console.log(
//         `upload progress: ${Math.round(
//           (ProgressEvent.loaded / ProgressEvent.total) * 100
//         )}%`
//       ),
//   });
// }

export function deleteProject(projectId) {
  return http.delete(`${apiUrl}/projects/${projectId}`);
}

// export function editProject(project) {
//   const projectId = project._id;
//   delete project._id;
//   return http.put(
//     `${apiUrl}/projects/private-area/edit-project-card/${projectId}`,
//     project
//   );
// }

export function editProject(project) {
  return http.put(`${apiUrl}/projects/${project._id}`, project, {
    onUploadProgress: ProgressEvent =>
      console.log(
        `upload progress: ${Math.round(
          (ProgressEvent.loaded / ProgressEvent.total) * 100
        )}%`
      ),
  });
}
// export function editprojectWithPics(project) {
//   return http.put(`${apiUrl}/projects/${project._id}`, project, {
//     onUploadProgress: ProgressEvent =>
//       console.log(
//         `upload progress: ${Math.round(
//           (ProgressEvent.loaded / ProgressEvent.total) * 100
//         )}%`
//       ),
//   });
// }

export function getProject(projectId) {
  return http.get(
    `${apiUrl}/projects/private-area/edit-project-card/${projectId}`
  );
}

export async function getProjects() {
  return http.get(`${apiUrl}/projects/private-area/projects-search-page`);
}

export function getMyProject(projectId) {
  return http.get(`${apiUrl}/projects/project-page/${projectId}`);
}

export function changePublishStatus(projectId) {
  return http.patch(`${apiUrl}/projects/changePublishStatus/${projectId}`);
}
