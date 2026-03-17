import { Outlet } from "react-router-dom";
import { AuthProvider } from "../auth/auth.context";
import { SocketContextProvider } from "../auth/SocketContext";

const ProvidersLayout = () => {
  return (
    <AuthProvider>
      <SocketContextProvider>
        <Outlet />
      </SocketContextProvider>
    </AuthProvider>
  );
};

export default ProvidersLayout;
