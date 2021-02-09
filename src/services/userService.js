import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

export function getJwt(){
return localStorage.getItem("token") ;
}

export function logout() {
 return localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem("token", data.token);
}

export async function getUsers(){
  return http.get(`${apiUrl}/users/private-area/users`);
}

export function deleteUser(userId){
  return http.delete(`${apiUrl}/users/${userId}`);
}

export function changUserStatus(userId) {
  return http.patch(`${apiUrl}/users/${userId}`)
}