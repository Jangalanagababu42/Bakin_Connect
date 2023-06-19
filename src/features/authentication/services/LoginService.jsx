import axios from "axios";

function LoginService(loginData) {
  console.log("hello");
  return axios.post(`/api/auth/login`, {
    username: loginData.username,
    password: loginData.password,
  });
}

export default LoginService;
