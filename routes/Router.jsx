import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../Pages/login/login";
import SignUp from "../Pages/signup/SignUp";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../components/Home/Home";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyAddedTickets from "../Pages/Dashboard/Seller/MyAddedTickets";
import AddTicket from "../Pages/Dashboard/Seller/AddTicket";
import MyInventory from "../Pages/Dashboard/Seller/MyInventory";
import RequestedBookings from "../Pages/Dashboard/Seller/RequestedBookings";
import Profile from "../Pages/Dashboard/Seller/Profile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Seller Routes
      {
        path: "add-ticket",
        element: (
          <PrivateRoute>
            <AddTicket />
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-tickets",
        element: (
          <PrivateRoute>
            <MyAddedTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: "requested-bookings",
        element: (
          <PrivateRoute>
            <RequestedBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      // Admin Routes
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            {/* <ManageUsers /> */}
            <div>Manage Users Page Placeholder</div>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute>
            {/* <ManageOrders /> */}
            <div>Manage Orders Page Placeholder</div>
          </PrivateRoute>
        ),
      },
      // Buyer Routes
      {
        path: "profile",
        element: (
          <PrivateRoute>
            {/* <Profile /> */}
            <div>Profile Page Placeholder</div>
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            {/* <MyOrders /> */}
            <div>My Orders Page Placeholder</div>
          </PrivateRoute>
        ),
      },
      // Dashboard default page (Statistics)
      {
        index: true,
        element: (
          <PrivateRoute>
            {/* <Statistics /> */}
            <div>Dashboard Home / Statistics Placeholder</div>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
