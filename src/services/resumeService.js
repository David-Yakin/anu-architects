import http from "./httpService";
import { apiUrl } from "../config.json";

export function createResume(resume) {
  return http.post(`${apiUrl}/resumes`, resume, {
    onUploadProgress: ProgressEvent => console.log(`upload progress: ${Math.round(ProgressEvent.loaded / ProgressEvent.total *100)}%`)
  })}

export function editResume(resume) {
  const resumeId = resume._id;
  delete resume._id;
  return http.put(`${apiUrl}/resumes/private-area/edit-resume-card/${resumeId}`, resume);
}

export function editResumeWithPics(resume) {
  const resumeId = resume._id;
  return http.put(`${apiUrl}/resumes/${resumeId}`, resume, {
    onUploadProgress: ProgressEvent => console.log(`upload progress: ${Math.round(ProgressEvent.loaded / ProgressEvent.total *100)}%`)});
}

export function getResume(resumeId) {
  return http.get(`${apiUrl}/resumes/private-area/edit-resume-card/${resumeId}`);
}

export function getMyResume(resumeId) {
  return http.get(`${apiUrl}/resumes/private-area/resume-page/${resumeId}`);
}

export async function getResumes(){
  return http.get(`${apiUrl}/resumes/resumes/resume-search-page`);
}

export function deleteResume(resumeId){
  return http.delete(`${apiUrl}/resumes/${resumeId}`);
}