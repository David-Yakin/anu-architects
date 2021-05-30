import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getQnas(){
  return http.get(`${apiUrl}/qnas/qnas/qna-search-page`);}

export function createQna({question, title, text, img, alt}) {
  const obj = {question, answer: {title, text, img, alt}}
  return http.post(`${apiUrl}/qnas`, obj);}

export function editQna({question, title, text, img, alt, _id}) {
  const obj = {question, answer: {title, text, img, alt}}
  return http.put(`${apiUrl}/qnas/private-area/edit-qna-card/${_id}`, obj);}

export function getQna(qnaId) {
  return http.get(`${apiUrl}/qnas/private-area/edit-qna-card/${qnaId}`);
}

export function deleteQna(qnaId){
  return http.delete(`${apiUrl}/qnas/${qnaId}`);
}