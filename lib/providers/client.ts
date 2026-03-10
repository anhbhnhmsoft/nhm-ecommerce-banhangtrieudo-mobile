import axios from "axios";
import { _BackendURL, _HTTPStatus } from "@/lib/consts";
import { SecureStorage } from "@/lib/storage";
import { _StorageKey } from "@/lib/storage/key";
import ErrorAPIServer, { IValidationErrors } from "@/lib/types";

export const client = axios.create({
  baseURL: `${_BackendURL}/api`,
  timeout: 30000, // Set a timeout for requests (30 seconds)
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

client.interceptors.request.use(
  async (config) => {
    // Add an authorization token if available
    const token = await SecureStorage.getItem<string>(
      _StorageKey.SECURE_AUTH_TOKEN
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorResponse = error.response;
    const errorData = error.response?.data;
    //Nếu có lỗi trả ra từ server
    if (errorResponse && errorData) {
      let messageError: string | null | undefined = errorData.message;
      let statusCodeResponse: number | null | undefined = errorResponse?.status;

      if (!messageError)
        messageError = "Có lỗi xảy ra với hệ thống. Vui lòng thử lại sau.";
      if (!statusCodeResponse) statusCodeResponse = 0;
      if (statusCodeResponse === _HTTPStatus.VALIDATE_FAILED_REQUEST) {
        const errorValidate: IValidationErrors = errorData.errors;
        return Promise.reject(
          new ErrorAPIServer(
            statusCodeResponse,
            messageError,
            errorResponse,
            errorValidate
          )
        );
      } else {
        return Promise.reject(
          new ErrorAPIServer(statusCodeResponse, messageError, errorResponse)
        );
      }
    } else if (error.request) {
      return Promise.reject(
        new ErrorAPIServer(
          _HTTPStatus.BAD_REQUEST,
          "Yêu cầu không hợp lệ. Vui lòng kiểm tra lại.",
          errorResponse
        )
      );
    } else {
      return Promise.reject(
        new ErrorAPIServer(
          _HTTPStatus.INTERNAL_SERVER_ERROR,
          "Hệ thống gặp lỗi. Vui lòng thử lại sau.",
          errorResponse
        )
      );
    }
  }
);
