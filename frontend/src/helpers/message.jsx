import toast from "react-hot-toast";

export const msgError = (message) => {
   return toast.error(message);
};

export const msgSuccess = (message) => {
   return toast.success(message);
};
