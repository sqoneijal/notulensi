import { Navigate } from "react-router";

const ProtectedRoute = ({ children, allowedRoles, userRole }) => {
   if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
   }

   return children;
};

export default ProtectedRoute;
