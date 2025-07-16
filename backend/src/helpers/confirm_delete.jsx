import { _delete } from "@helpers/request";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const confirm = async (url) => {
   return MySwal.fire({
      title: "Apakah anda yakin?",
      text: "Anda tidak akan dapat mengembalikannya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus saja!",
      cancelButtonText: "Batal",
   }).then((result) => {
      if (result.isConfirmed) {
         const submit = _delete(url);
         submit.then((res) => {
            const { data } = res;
            Swal.fire({
               title: "Deleted!",
               text: data.message,
               icon: data.status ? "success" : "error",
            });
         });
      }
   });
};
export { confirm };
