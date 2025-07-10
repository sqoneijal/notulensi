import axios from "axios";
import toast from "react-hot-toast";

export const post = async (url, form = [], config = {}) => {
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
      const formData = new FormData();
      Object.keys(form).forEach((data) => formData.append(data, form[data]));

      const send = axios.post(`${import.meta.env.VITE_API_URL}${url}`, formData, { ...config, signal: abortSignal(200_000) });
      send.then((res) => {
         const { data } = res;
         if (typeof data.code !== "undefined" && data.code !== 200) {
            toast.error(data.message);
         }
      });
      send.catch((e) => {
         if (e.code === "ERR_CANCELED") {
            toast.error("Sistem sedang sibuk, silahkan coba beberapa saat lagi!");
         }
      });

      mutex.unlock();
      return await send;
   } catch (error) {
      toast.error(`[${error.code}] ${error.message}`);
   }
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

      const send = axios.get(`${import.meta.env.VITE_API_URL}${url}`, { ...config, signal: abortSignal(200_000) });
      send.then((res) => {
         const { data } = res;
         if (typeof data.code !== "undefined" && data.code !== 200) {
            toast.error(data.message);
         }
      });
      send.catch((e) => {
         if (e.code === "ERR_CANCELED") {
            toast.error("Sistem sedang sibuk, silahkan coba beberapa saat lagi!");
         }
      });

      mutex.unlock();
      return await send;
   } catch (error) {
      toast.error(`[${error.code}] ${error.message}`);
   }
};

const abortSignal = (timeoutMs) => {
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), timeoutMs || 0);
   return abortController.signal;
};
