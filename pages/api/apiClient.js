import axios from "axios";
// import { authService } from './authService';

const config = {
  api: {
    baseURL: "https://dummyapi.io/data/v1",
    timeout: 60000,
  },
  acceptedFileExtentions: ".png,.docx,.jpg,.jpeg,.pdf,.doc,.xls,.xlsx",
};

const apiClient = axios.create(config.api);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    config.headers.common["Content-Type"] = "application/json";
    config.headers.common["Accept"] = "application/json";
    config.headers.common["app-id"] = "62ae8aa9292f29704a4df655";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
