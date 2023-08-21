import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "https://rebrickable.com/api/v3/lego/",
});

const responseBody = (response: AxiosResponse) => response.data;
