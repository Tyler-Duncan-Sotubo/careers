import Axios from "axios";
import { isAxiosError } from "axios";
import qs from "qs";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }), // ✅ fixes ?key=value1&key=value2
});

export { axiosInstance, isAxiosError };
