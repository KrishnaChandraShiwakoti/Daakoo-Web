import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Error,
  LandingPage,
  Menu,
  About,
  Contact,
  Location,
} from "./core";
import AmdminHomeLayout from "./admin/core/private/HomeLayout";

import {
  AdminMenu,
  AdminDashboard,
  AdminOrders,
  AdminCategories,
  AdminCustomers,
  AdminAnalytics,
  AdminReviews,
  AdminSettings,
} from "./admin/core/private";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          element: <LandingPage />,
          index: "true",
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/locations",
          element: <Location />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AmdminHomeLayout />,
      errorElement: <Error />,
      children: [
        {
          element: <AdminDashboard />,
          index: "true",
        },
        {
          element: <AdminOrders />,
          path: "orders",
        },
        {
          element: <AdminMenu />,
          path: "menu",
        },
        {
          element: <AdminSettings />,
          path: "settings",
        },
        {
          element: <AdminCategories />,
          path: "categories",
        },
        {
          element: <AdminCustomers />,
          path: "customers",
        },
        {
          element: <AdminAnalytics />,
          path: "analytics",
        },
        {
          element: <AdminReviews />,
          path: "reviews",
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
