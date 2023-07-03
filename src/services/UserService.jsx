import axios from "axios";

export const UserService = () => {
  return axios.get(`/api/users`);
};

export const EditUsetService = (token, profileData) => {
  const body = { userData: profileData };
  const config = { headers: { authorization: `${token}` } };
  return axios.post(`/api/users/edit`, body, config);
};
