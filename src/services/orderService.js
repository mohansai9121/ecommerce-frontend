import API from "./api";

export const createOrder = (data) => {
  return API.post("/orders", data);
};
