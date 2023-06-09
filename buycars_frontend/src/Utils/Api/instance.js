import axios from "axios";
import { getToken } from "../storeToken";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
export const AuthApi = axios.create({
  baseURL: apiBaseUrl,

});
const token = getToken("token")
export const MainApi = axios.create({
  baseURL: apiBaseUrl, 
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization :` bearer ${token}`
  },
});
export const NonFormApi = axios.create({
  baseURL: apiBaseUrl, 
  headers: {
    'Content-Type': 'application/json',
    Authorization :` bearer ${token}`
  },
});
