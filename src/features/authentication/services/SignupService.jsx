import axios from "axios";

function SignupService(signupData) {
  return axios.post(`/api/auth/signup`, {
    username: signupData.username,
    password: signupData.password,
    firstName: signupData.firstName,
    lastName: signupData.lastName,
    avatarUrl: signupData.avatarUrl,
  });
}

export default SignupService;
