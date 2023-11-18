import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://komorebi-production-0bxe.onrender.com/api/v1/",
});

export default axios;
