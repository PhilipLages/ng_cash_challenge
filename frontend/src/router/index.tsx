import {  createBrowserRouter,  RouterProvider } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from "../pages/Login";
import SignUp from '../pages/SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/:id/dashboard",
    element: <Dashboard />
  },
])

export default function Routes() {
  return (
    <RouterProvider router={ router } />
  )
}