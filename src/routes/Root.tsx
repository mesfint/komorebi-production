import { Outlet, ScrollRestoration } from "react-router-dom";
import Inspx from "inspx";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Root() {
  return (
    <Inspx>
      <Header />
      {/* Outlet will be shared throut the pages*/}
      <Outlet />
      <Footer />
      <Toaster />
      {/* ScrollR => will fix a problem when we move from page to page
      ,It always takes us to the top of the page, otherwise we will be 
      forwared to the bottom of page */}
      <ScrollRestoration />
    </Inspx>
  );
}

export default Root;
