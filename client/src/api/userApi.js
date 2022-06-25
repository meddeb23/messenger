import axios from "axios";

const USER_BASE_URL = "/api/v1/user";

async function getUser() {
  const { data, status } = await axios.get(USER_BASE_URL);
  return { data, status };
}
async function logout() {
  const { data, status } = await axios.get(`${USER_BASE_URL}/logout`);
  return { data, status };
}
async function login({ email, password }) {
  const { data, status } = await axios.post(`${USER_BASE_URL}/login`, {
    email,
    password,
  });
  return { data, status };
}
async function register({ name, email, password, cPassword }) {
  const { data, status } = await axios.post(`${USER_BASE_URL}/register`, {
    name,
    email,
    password,
    cPassword,
  });
  return { data, status };
}

async function updateUser({ formData, values }) {
  const { data, status } = await axios.post(
    `${USER_BASE_URL}/upload_pic`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const { data1, status1 } = await axios.post(
    `${USER_BASE_URL}/information`,
    values
  );
  return;
}

async function search({ search }) {
  const { data, status } = await axios.post(`${USER_BASE_URL}/search`, {
    search,
  });
  return { data, status };
}
async function suggestion() {
  const { data, status } = await axios.get(`${USER_BASE_URL}/suggestion`);
  return { data, status };
}
export default Object.freeze({
  getUser,
  logout,
  login,
  register,
  updateUser,
  search,
  suggestion,
});
