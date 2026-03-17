import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Profile from "../pages/profile/Profile";
import Chat from "../pages/chat/Chat";
import NotFound from "../pages/notfound/NotFound";
import Landing from "../pages/landing/Landing";
import ProtectedRoute from "../routes/ProtectedRoute";
import ChatPage from "../pages/chat/ChatPage";
import AllUsers from "../pages/AllUser/AllUser";
import ProvidersLayout from "./ProvidersLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProvidersLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/chat/:userId",
        element: <ProtectedRoute> <ChatPage /> </ProtectedRoute>,
      },
      {
        path: "/allusers",
        element: <ProtectedRoute> <AllUsers /> </ProtectedRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
  }
]);

export default router;