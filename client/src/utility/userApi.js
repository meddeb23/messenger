import axios from "axios";

const BASE_URL = "/api/v1/user";

export const fetchUserInfo = async () => {
  try {
    const res = await axios.get(`${BASE_URL}`);
    return Promise.resolve(res.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};
