import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const { currentUser } = useContext(AuthContext);

  const queryClient = new QueryClient();

  function Layout() {
    return (
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="flex max-w-7xl mx-auto w-full">
          <LeftBar />
          <Outlet />
          <RightBar />
        </div>
      </QueryClientProvider>
    );
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile/:id", element: <Profile /> },
      ],
    },
    { path: "/login", element: currentUser ? <Navigate to="/" /> : <Login /> },
    {
      path: "/register",
      element: currentUser ? <Navigate to={"/"} /> : <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
