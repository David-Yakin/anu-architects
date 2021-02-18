import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

export function getJwt(){
return localStorage.getItem("token") ;
}

export async function createUser({userID, name, lastName, email, phone, country, city, street, houseNumber, zip, password }) {
  const obj = { userID, name, lastName, email, phone, adress : { country, city, street, houseNumber, zip }, password}
  await http.post(`${apiUrl}/users`, obj); 
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem("token", data.token);
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

export function getUser(userId) {
  return http.get(`${apiUrl}/users/user/${userId}`);
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

export function changUserProjectManagerStatus(userId) {
  return http.patch(`${apiUrl}/users/isProjectManager/${userId}`)
}

export function editUser(user) {
  const userId = user._id;
  delete user._id;
  return http.patch(`${apiUrl}/users/user/${userId}`, user);
}

