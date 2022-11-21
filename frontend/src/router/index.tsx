import React from 'react';
import {  createBrowserRouter,  RouterProvider } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
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
    path: "/dashboard",
    element: <Dashboard />
  },
])

export default function Router() {
  return (
    <RouterProvider router={ router } />
  )
}