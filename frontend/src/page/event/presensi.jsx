import keycloak from "@helpers/keycloak";
import { msgError, msgSuccess } from "@helpers/message";
import { post } from "@helpers/request";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const Presensi = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      const initKeycloak = async () => {
         if (typeof window === "undefined" || !window.crypto?.subtle) {
            console.warn("Web Crypto API not available — Keycloak not initialized.");
            return null;
         }

         const authenticated = await keycloak.init({
            onLoad: "check-sso",
            checkLoginIframe: false,
         });

         if (authenticated && !keycloak.isTokenExpired()) {
            const user = await keycloak.loadUserInfo();
            return { keycloak, user };
         } else {
            keycloak.login();
            return null;
         }
      };

      initKeycloak().then(({ keycloak, user }) => {
         if (Object.keys(keycloak).length > 0 && Object.keys(user).length > 0) {
            const fetch = post(`/presensi/${id}`, user, {
               headers: {
                  Authorization: `Bearer ${keycloak.token}`,
               },
            });
            fetch.then(({ data }) => {
               const { status } = data;
               if (status) {
                  msgSuccess(data.message);
                  navigate(`/detail/event/${id}`);
               } else {
                  msgError(data.message);
               }
            });
         }
      });
      return () => {};
   }, [id, navigate]);
};
export default Presensi;
