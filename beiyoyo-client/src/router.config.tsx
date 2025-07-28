import Page from "@/pages/index";
import { Login } from "./pages/login";
import { PhotoList } from "./components/photoList";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    // element: <ProtectedRoute><Page /></ProtectedRoute>,
    element: <Page />,

    children: [
      {
        path: "home",
        element: <PhotoList />,
        meta: { title: "首页", requiresAuth: true },
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
];

export default routes;
