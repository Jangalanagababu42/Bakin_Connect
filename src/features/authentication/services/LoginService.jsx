import axios from "axios";

function LoginService(loginData) {
  return axios.post(`/api/auth/login`, {
    username: loginData.username,
    password: loginData.password,
  });
}

export default LoginService;
