import axios from "axios";

export const UserService = () => {
  return axios.get(`/api/users`);
};
