import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/AppLayout";

import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Shop from "../pages/Shop/Shop";
import ProtectedRoute from "../ui/ProtectedRoute";
import PublicRoute from "../ui/PublicRoute";
import Cart from "../pages/Cart/Cart";
import Product from "../pages/Product/Product";
import Account from "../pages/Account/Account";
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminRoute from "../ui/AdminRoute";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Products from "../features/dashboard/Products/Products";
import Orders from "../features/dashboard/Orders/Orders";
import UserOrders from "../features/account/UserOrders";
import UserAddresses from "../features/account/UserAddresses";
import AccountInfo from "../features/account/AccountInfo";
import Checkout from "../pages/Checkout/Checkout";

const protectedRoutes = [
  {
    path: "account",
    element: <Account />,
    children: [
      {
        index: true,
        element: <AccountInfo />,
      },
      {
        path: "orders",
        element: <UserOrders />,
      },
      {
        path: "addresses",
        element: <UserAddresses />,
      },
    ],
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
];

const adminRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "orders",
    element: <Orders />,
  },
];

const publicRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Protected routes
      ...protectedRoutes.map((route) => ({
        ...route,
        element: <ProtectedRoute>{route.element}</ProtectedRoute>,
      })),

      // Public routes
      ...publicRoutes.map((route) => ({
        ...route,
        element: <PublicRoute>{route.element}</PublicRoute>,
      })),

      {
        index: true,
        element: <Shop />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "products/:id",
        element: <Product />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <AdminLayout />,
    children: [
      // Admin routes
      ...adminRoutes.map((route) => ({
        ...route,
        element: <AdminRoute>{route.element}</AdminRoute>,
      })),
    ],
  },
]);

export default router;
