import axios from "axios";
const ROLE_ADMIN = "ROLE_56590ba1-e30d-4d77-a447-19d6c4f91925";
const ROLE_USER = "ROLE_62f36103-2be0-4428-b78d-3dec372c02ed";
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
      role_ids: [ROLE_ADMIN],
      phone_number: +dataInfo.phone_number,
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
      role_ids: [ROLE_USER],
      phone_number: +dataInfo.phone_number,
    },
    { headers }
  );
};
export { loginService, profileUser, registerService, registerAdminService };
