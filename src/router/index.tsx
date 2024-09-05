import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DefaultLayout from "../layout/DefaultLayout";
import SignIn from "../components/SignIn";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <App/>
      },
      {
        path: "/signin",
        element: <SignIn/>,
      },
    ],
  },
]);

export default router;
