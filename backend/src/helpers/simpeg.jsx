import axios from "axios";
import toast from "react-hot-toast";

const headers = { "Content-Type": "application/json" };

const abortSignal = (timeoutMs) => {
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), timeoutMs || 0);
   return abortController.signal;
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

const cariPegawai = async (str) => {
   const query = `
      query Pegawai($filter: PegawaiFilterInput) {
         daftarPegawai(filter: $filter) {
            pegawai {
               id
               nama
            }
         }
      }`;

   const variables = {
      filter: {
         searchString: str,
      },
   };

   await mutex.lock();

   const send = axios.post(
      import.meta.env.VITE_API_SIMPEG_URL,
      {
         query,
         variables,
      },
      {
         headers,
         signal: abortSignal(200_000),
      }
   );
   send.then((res) => {
      const { data } = res;
      if (typeof data.code !== "undefined" && data.code !== 200) {
         toast.error(data.message);
      }
   });
   send.catch((error) => {
      if (error.code === "ERR_CANCELED") {
         toast.error("Sistem sedang sibuk, silahkan coba beberapa saat lagi!");
         return;
      }
      toast.error(`[${error?.code}] ${error.message}`);
   });

   mutex.unlock();
   return await send.then((res) => {
      const { data } = res;
      return data.data.daftarPegawai.pegawai;
   });
};

export { cariPegawai };
