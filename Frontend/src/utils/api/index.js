import axios from "axios";

const baseURL = "https://loud-backend.herokuapp.com";

const homePageApi = () => {
  const res = axios.get(`${baseURL}/top_nft`);
  return res;
};

// get top users
const getTopUsersApi = () => {
  const res = axios.get(`${baseURL}/top_users`);

  return res;
};

//get user specfic data
const getTopSpecificUsersApi = (data) => {
  const res = axios.post(`${baseURL}/get_user_details`, data);
  return res;
};

// get More Auctions
const getMoreAuctionsApi = () => {
  const res = axios.get(`${baseURL}/get_more_auction`);
  return res;
};

const sendEmailApi = (data) => {
  const res = axios.post(`${baseURL}/send_email`, data);
  return res;
};

const api = {
  homePageApi,
  getTopUsersApi,
  getTopSpecificUsersApi,
  getMoreAuctionsApi,
  sendEmailApi,
};

export default api;
