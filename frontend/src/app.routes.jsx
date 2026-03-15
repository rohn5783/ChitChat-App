import { createBrowserRouter } from "react-router-dom";

import Login from "../src/pages/login/Login";
import Register from "../src/pages/register/Register";
import Profile from "../src/pages/profile/Profile";
import Chat from "../src/pages/chat/Chat";
import NotFound from "../src/pages/notfound/NotFound";
import Landing from "../src/pages/landing/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
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
    element: <Profile />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;