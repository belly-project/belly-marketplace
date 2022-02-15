import axios from "axios";

const marketplaceApi = axios.create({
  baseURL: "https://belly-marketplace-api.herokuapp.com/",
});

const localMarketplaceApi = axios.create({
  baseURL: "http://192.168.1.168:9000/",
});

export { marketplaceApi, localMarketplaceApi };
