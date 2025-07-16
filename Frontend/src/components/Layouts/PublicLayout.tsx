// src/layouts/PublicLayout.jsx
import { Outlet } from "react-router-dom";
import { Footer } from "../FirstVisit/Footer";
import Header from "../FirstVisit/Header";



export default function PublicLayout() {


  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
