import axios from '../plugin/axios';

const apiMethodes = {
  // GET Request with optional slug and query parameters
  get<T>(
    url: string, 
    slug?: string, // Slug is optional
    params?: Record<string, any>, // Query parameters are optional
    customHeaders?: Record<string, string> // Custom headers are optional
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      axios.setToken();
      
      // Set custom headers if provided
      if (customHeaders) {
        Object.entries(customHeaders).forEach(([key, value]) => {
          axios.setHeader(key, value);
        });
      } 
      // Axios expects the params to be inside the config object
      const config = params ? { params } : {};

      axios
        .get(url,slug??undefined, config) // Pass the config object containing params
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },

  // POST Request with optional payload and custom headers
  post<T>(
    url: string, 
    data?: any, // Payload is optional
    customHeaders?: Record<string, string> // Custom headers are optional
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      axios.setToken();
      
      // Set custom headers if provided
      if (customHeaders) {
        Object.entries(customHeaders).forEach(([key, value]) => {
          axios.setHeader(key, value);
        });
      }

      // POST request with data (payload)
      axios
        .post(url, data)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },

  // PUT Request with optional payload and custom headers
  put<T>(
    url: string, 
    data?: any, // Payload is optional
    customHeaders?: Record<string, string> // Custom headers are optional
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      axios.setToken();
      
      // Set custom headers if provided
      if (customHeaders) {
        Object.entries(customHeaders).forEach(([key, value]) => {
          axios.setHeader(key, value);
        });
      }

      // PUT request with data (payload)
      axios
        .put(url, data)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },

  // DELETE Request with optional slug and custom headers
  delete<T>(
    url: string, 
    slug?: string, // Slug is optional for delete requests
    customHeaders?: Record<string, string> // Custom headers are optional
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      axios.setToken();
      
      // Set custom headers if provided
      if (customHeaders) {
        Object.entries(customHeaders).forEach(([key, value]) => {
          axios.setHeader(key, value);
        });
      }

      // DELETE request
      axios
        .delete(url,slug)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
};

export default apiMethodes;
