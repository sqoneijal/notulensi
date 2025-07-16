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

export const post = async (url, form = [], config = {}) => {
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

   const formData = new FormData();
   formData.append("user_modified", keycloakInstance.userInfo.preferred_username);
   Object.keys(form).forEach((data) => formData.append(data, form[data]));

   let urlPath = `${import.meta.env.VITE_API_URL}${url}`;
   const containsHttp = containsHttpUrl(url);
   if (containsHttp) {
      urlPath = url;
   }

   const send = axios.post(urlPath, formData, { ...config, signal: abortSignal(200_000) });
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

export const get = async (url, config = {}) => {
   try {
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

      await mutex.lock();

      const send = axios.get(`${window.apiUrl}${url}`, { ...config, signal: abortSignal(200_000) });
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
            toast.error(e.message);
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
