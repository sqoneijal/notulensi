import axios from "axios";
import toast from "react-hot-toast";
import keycloakInstance from "./keycloak";

const containsHttpUrl = (str) => {
   return /^https?:\/\//.test(str);
};

const mutex = {
   locked: false,
   lock() {
      if (this.locked) {
         return new Promise((resolve) => {
            setTimeout(() => {
               resolve(this.lock());
            }, 10);
         });
      } else {
         this.locked = true;
         return Promise.resolve();
      }
   },
   unlock() {
      this.locked = false;
   },
};

const sendRequest = async (method, url, form = {}, config = {}) => {
   await mutex.lock();

   // Autentikasi token Keycloak
   const token = keycloakInstance?.token;
   if (token && keycloakInstance.isTokenExpired()) {
      await keycloakInstance.updateToken(30);
      config.headers = {
         ...(config.headers || {}),
         Authorization: `Bearer ${keycloakInstance.token}`,
      };
   } else {
      config.headers = {
         ...(config.headers || {}),
         Authorization: `Bearer ${token}`,
      };
   }

   const payload = {
      ...form,
      user_modified: keycloakInstance.userInfo.preferred_username,
   };

   // Deteksi URL absolut
   let urlPath = `${import.meta.env.VITE_API_URL}${url}`;
   if (containsHttpUrl(url)) {
      urlPath = url;
   }

   let dataToSend;
   if (method === "post") {
      dataToSend = new FormData();
      for (const [key, value] of Object.entries(payload)) {
         if (Array.isArray(value)) {
            value.forEach((v) => dataToSend.append(`${key}[]`, v));
         } else {
            dataToSend.append(key, value);
         }
      }
   } else {
      dataToSend = JSON.stringify(payload);
      config.headers["Content-Type"] = "application/json";
   }

   const send = axios({
      method,
      url: urlPath,
      data: dataToSend,
      ...config,
      signal: abortSignal(200_000),
   });

   send.then((res) => {
      const { data } = res;
      if (typeof data.code !== "undefined" && data.code !== 200) {
         toast.error(data.message);
      }
   });

   send.catch((e) => {
      if (e.code === "ERR_CANCELED") {
         toast.error("Sistem sedang sibuk, silahkan coba beberapa saat lagi!");
      } else {
         toast.error(`[${e.code}] ${e.message}`);
      }
   });

   mutex.unlock();
   return await send;
};

export const post = (url, form = {}, config = {}) => sendRequest("post", url, form, config);

export const put = (url, form = {}, config = {}) => sendRequest("put", url, form, config);

export const get = async (url, config = {}) => {
   try {
      await mutex.lock();

      // 🔁 Periksa dan perbarui token jika perlu
      if (keycloakInstance?.token && keycloakInstance.isTokenExpired()) {
         keycloakInstance.updateToken(30); // perbarui token jika tinggal <30s
         config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${keycloakInstance.token}`,
         };
      } else {
         config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${keycloakInstance.token}`,
         };
      }

      let urlPath = `${import.meta.env.VITE_API_URL}${url}`;
      const containsHttp = containsHttpUrl(url);
      if (containsHttp) {
         urlPath = url;
      }

      const send = axios.get(urlPath, { ...config, signal: abortSignal(200_000) });
      send.then((res) => {
         const { data } = res;
         if (typeof data.code !== "undefined" && data.code !== 200) {
            toast.error(data.message);
         }
      });
      send.catch((e) => {
         if (e.code === "ERR_CANCELED") {
            toast.error("Sistem sedang sibuk, silahkan coba beberapa saat lagi!");
         } else {
            toast.error(`[${e.code}] ${e.message}`);
         }
      });

      mutex.unlock();
      return await send;
   } catch (error) {
      toast.error(error.message);
   }
};

export const _delete = async (url, config = {}) => {
   try {
      await mutex.lock();

      // 🔁 Periksa dan perbarui token jika perlu
      if (keycloakInstance?.token && keycloakInstance.isTokenExpired()) {
         keycloakInstance.updateToken(30); // perbarui token jika tinggal <30s
         config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${keycloakInstance.refreshToken}`,
         };
      } else {
         config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${keycloakInstance.token}`,
         };
      }

      let urlPath = `${import.meta.env.VITE_API_URL}${url}`;
      const containsHttp = containsHttpUrl(url);
      if (containsHttp) {
         urlPath = url;
      }

      const send = axios.delete(urlPath, { ...config, signal: abortSignal(200_000) });
      send.then((res) => {
         const { data } = res;
         if (typeof data.code !== "undefined" && data.code !== 200) {
            toast.error(data.message);
         }
      });
      send.catch((e) => {
         if (e.code === "ERR_CANCELED") {
            toast.error("Sistem sedang sibuk, silahkan coba beberapa saat lagi!");
         } else {
            toast.error(`[${e.code}] ${e.message}`);
         }
      });

      mutex.unlock();
      return await send;
   } catch (error) {
      toast.error(error.message);
   }
};

const abortSignal = (timeoutMs) => {
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), timeoutMs || 0);
   return abortController.signal;
};

export const postValue = (obj) => {
   const formData = {};
   Object.keys(obj).forEach((key) => (formData[key] = obj[key]));
   return formData;
};
