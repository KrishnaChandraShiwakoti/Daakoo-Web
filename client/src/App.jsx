import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeLayout from "./core/public/HomeLayout";
import Error from "./core/public/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
