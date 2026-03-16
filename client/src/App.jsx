import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeLayout from "./core/public/HomeLayout";
import AmdminHomeLayout from "./admin/core/private/HomeLayout";
import Error from "./core/public/Error";
import Dashboarrd from "./admin/core/private/Dashboarrd";
import Orders from "./admin/core/private/orders";
import AdminMenu from "./admin/core/private/Menu";
import LandingPage from "./core/public/LandingPage";
import Menu from "./core/public/Menu";

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
      ],
    },
    {
      path: "/admin",
      element: <AmdminHomeLayout />,
      errorElement: <Error />,
      children: [
        {
          element: <Dashboarrd />,
          index: "true",
        },
        {
          element: <Orders />,
          path: "orders",
        },
        {
          element: <AdminMenu />,
          path: "menu",
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
