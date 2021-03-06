import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

export function getJwt() {
  return localStorage.getItem("token");
}

export function createUser(user) {
  return http
    .post(`${apiUrl}/users`, user)
    .catch(error => console.log(error.message));
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  return localStorage.setItem("token", data.token);
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

export async function getUsers() {
  return http.get(`${apiUrl}/users/private-area/users`);
}

export function deleteUser(userId) {
  return http.delete(`${apiUrl}/users/${userId}`);
}

export function changUserStatus(userId) {
  return http.patch(`${apiUrl}/users/${userId}`);
}

export function editUser(user) {
  const userId = user._id;
  delete user._id;
  return http.patch(`${apiUrl}/users/user/${userId}`, user);
}

export function forgotPassword(user) {
  return http.post(`${apiUrl}/users/forgot-password`, user);
}

export async function resetPassword(userId, token, password) {
  const { data } = await http.post(
    `${apiUrl}/users/reset-password/${userId}/${token}`,
    password
  );
  return localStorage.setItem("token", data.token);
}

export function sendMail(mail) {
  return http.post(`${apiUrl}/users/send-mail`, mail);
}
