import {  createBrowserRouter,  RouterProvider } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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

export default function Router() {
  return (
    <RouterProvider router={ router } />
  )
}