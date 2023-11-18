import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Shop from "./pages/shop";
import ProductDetails from "./pages/product-details";
import ShippingAddress from "./pages/ShippingAddress";
import Payment from "./pages/payment";
import Success from "./pages/success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id",
        element: <ProductDetails />,
      },
      {
        path: "/checkout/shipping",
        element: <ShippingAddress />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/checkout/payment",
        element: <Payment />,
      },
    ],
  },
]);

function App() {
  //we register the above navs inside app
  return <RouterProvider router={router} />;
}

export default App;
