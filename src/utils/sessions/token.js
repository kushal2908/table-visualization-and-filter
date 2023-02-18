// import jwt_decode from "jwt-decode";

export default function SET_TOKEN(token) {
  localStorage.setItem("token", token);
}

export const GET_TOKEN = () => {
  return localStorage.getItem("token") || null;
};

export const REMOVE_TOKEN = () => {
  return localStorage.clear();
};

export const SET_USER_INFO = (user) => {
  localStorage.setItem("user", user);
};

export const GET_USER_INFO = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  return user || null;
};
