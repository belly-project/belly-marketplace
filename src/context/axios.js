import axios from "axios";

const marketplaceApi = axios.create({
  baseURL: "https://belly-marketplace-api.herokuapp.com/",
});

export { marketplaceApi };
