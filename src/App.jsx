import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  const routes = createBrowserRouter([{
    element: <Home/>,
    path:"/"
  },{
    element: <PageNotFound/>,
    path:"*"
  }]) 
  return <RouterProvider router={routes}></RouterProvider>;
}
