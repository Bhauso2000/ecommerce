import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import auth from '../model/auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROOT,
headers: {
  "X-Requested-With": "XMLHttpRequest",
  Accept: "application/json",
}

});

// Request interceptor.
api.interceptors.request.use(
  (request) => request,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

// Response interceptor.
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const ApiService = {
 
  setHeader(key: string, value: string): void {
    api.defaults.headers.common[key] = value;
  },

  async setToken(): Promise<void> {
    const authToken = auth.getToken();
    if (authToken) {
      this.setHeader('Authorization', `Bearer ${authToken}`);
    }
  },

  query<T = any>(resource: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.get<T>(resource, config);
  },

  get<T = any>(
    resource: string,
    slug?: string, // Slug is optional
    config?: AxiosRequestConfig // Params or additional config (like query params)
  ): Promise<AxiosResponse<T>> {
    // Construct the final URL, appending the slug if present
    const url = slug ? `${resource}/${slug}` : resource;
  
    // Ensure the config is properly initialized if undefined
    const finalConfig: AxiosRequestConfig = config || {};
  
    // Only include params in the config if they exist
    if (config?.params) {
      finalConfig.params = config.params;
    }
  
    // Now passing the URL and finalConfig (which includes params if present)
    return api.get<T>(url, finalConfig);
  }
,  

  post<T = any>(
    resource: string,
    params?: any, // Payload is optional
    config?: AxiosRequestConfig // Optional config (query params or headers)
  ): Promise<AxiosResponse<T>> {
    return api.post<T>(resource, params, config);
  },

  patch<T = any>(
    resource: string,
    params?: any, // Payload is optional
    config?: AxiosRequestConfig // Optional config (query params or headers)
  ): Promise<AxiosResponse<T>> {
    return api.patch<T>(resource, params, config);
  },

  update<T = any>(
    resource: string,
    slug: string, // Slug is required for updating
    params?: any, // Payload is optional
    config?: AxiosRequestConfig // Optional config (query params or headers)
  ): Promise<AxiosResponse<T>> {
    const url = `${resource}/${slug}`;
    return api.put<T>(url, params, config);
  },

  put<T = any>(
    resource: string,
    params?: any, // Payload is optional
    config?: AxiosRequestConfig // Optional config (query params or headers)
  ): Promise<AxiosResponse<T>> {
    return api.put<T>(resource, params, config);
  },

  delete<T = any>(
    resource: string,
    slug?: string, // Slug is optional for delete requests
    config?: AxiosRequestConfig // Optional config (query params or headers)
  ): Promise<AxiosResponse<T>> {
    const url = slug ? `${resource}/${slug}` : resource;
    return api.delete<T>(url, config);
  },
};

export { api as axiosInstance };
export default ApiService;
