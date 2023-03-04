import axios from "axios";

// import axios from "../config/axios";
const loginService = (username, password) => {
  return axios.post(`https://bansachweb.vercel.app/v1/api/login`, {
    username,
    password,
  });
};

const profileUser = (access_token) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  return axios.get("https://bansachweb.vercel.app/v1/api/profile", {
    headers,
  });
};

const registerService = ({
  full_name,
  address,
  phone_number,
  email,
  username,
  password,
}) => {
  return axios.post(`https://bansachweb.vercel.app/v1/api/register`, {
    full_name,
    address,
    phone_number,
    email,
    password,
  });
};
export { loginService, profileUser, registerService };