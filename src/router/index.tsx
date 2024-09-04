import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DefaultLayout from "../layout/DefaultLayout";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);

export default router;
