import axios from "axios";

// import axios from "../config/axios";

const headers = {
  "Content-Type": "application/json",
};

const loginService = (username, password) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/login`,
    {
      username,
      password,
    },
    { headers }
  );
};

const registerAdminService = ({ ...dataInfo }) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/register-account-admin`,
    {
      ...dataInfo,
    },
    { headers }
  );
};

const profileUser = (access_token) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}`, {
    headers,
  });
};

const registerService = ({ ...dataInfo }) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/register`,
    {
      ...dataInfo,
      phone_number: +dataInfo.phone_number,
    },
    { headers }
  );
};
export { loginService, profileUser, registerService, registerAdminService };
