import { createBrowserRouter } from "react-router-dom";
import ProductManager from "../pages/ProductManager";

const routers = createBrowserRouter([
  {
    path: "/product-manager",
    element: <ProductManager />,
  },
]);

export default routers;
