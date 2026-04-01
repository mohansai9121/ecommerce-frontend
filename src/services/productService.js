import API from "./api";

export const getProducts = (params) => {
  return API.get("/products", { params });
};
