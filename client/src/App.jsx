import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  HomeLayout,
  Error,
  LandingPage,
  Orders,
  Checkout,
  Payment,
  Login,
  Menu,
  Profile,
  Register,
  About,
  Contact,
} from "./core";
import AdminHomeLayout from "./admin/core/private/HomeLayout";

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
import {
  StaffHomeLayout,
  StaffInventory,
  StaffLiveOrders,
  StaffOrderDetail,
  StaffOrderHistory,
  StaffReadyForPickup,
} from "./staff/core/private";
import { getDashboardPathByRole, readStoredSession } from "./utils/authSession";

const StartupRoute = () => {
  const { isAuthenticated, role } = readStoredSession();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  const dashboardPath = getDashboardPathByRole(role);
  if (dashboardPath === "/") {
    return <LandingPage />;
  }

  return <Navigate to={dashboardPath} replace />;
};

const LoginRoute = () => {
  const { isAuthenticated, role } = readStoredSession();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Navigate to={getDashboardPathByRole(role)} replace />;
};

const RequireAuthRoute = ({ children }) => {
  const { isAuthenticated } = readStoredSession();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please login to access this page." }}
      />
    );
  }

  return children;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          element: <StartupRoute />,
          index: "true",
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path: "/orders",
          element: (
            <RequireAuthRoute>
              <Orders />
            </RequireAuthRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <RequireAuthRoute>
              <Checkout />
            </RequireAuthRoute>
          ),
        },
        {
          path: "/payment",
          element: (
            <RequireAuthRoute>
              <Payment />
            </RequireAuthRoute>
          ),
        },
        {
          path: "/about",
          element: <About />,
        },

        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/login",
          element: <LoginRoute />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile",
          element: (
            <RequireAuthRoute>
              <Profile />
            </RequireAuthRoute>
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminHomeLayout />,
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
    {
      path: "/staff",
      element: <StaffHomeLayout />,
      errorElement: <Error />,
      children: [
        {
          element: <StaffLiveOrders />,
          index: "true",
        },
        {
          path: "ready",
          element: <StaffReadyForPickup />,
        },
        {
          path: "history",
          element: <StaffOrderHistory />,
        },
        {
          path: "orders/:id",
          element: <StaffOrderDetail />,
        },
        {
          path: "inventory",
          element: <StaffInventory />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
