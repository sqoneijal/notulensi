const BootstrapToast = ({ children }) => {
   return (
      <ToastContainer position="top-center" className="p-3" containerPosition="fixed">
         {children}
      </ToastContainer>
   );
};
export default BootstrapToast;
