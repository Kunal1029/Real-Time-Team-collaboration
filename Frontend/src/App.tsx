import CompanyPage from "./components/FirstVisit/CompanyPage";
import ContactUs from "./components/FirstVisit/ContactUs";
import Hero from "./components/FirstVisit/Hero";
import { Login } from "./components/FirstVisit/Login";
import PublicLayout from "./components/Layouts/PublicLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateLayout from "./components/Layouts/PrivateLayout";
import Protected from "./components/Layouts/Protected";
import UnAuthorized from "./components/Layouts/UnAuthorized";
import RoleBasedAuth from "./components/Layouts/RoleBasedAuth";
import AdminLayout from "./components/Layouts/AdminLayout";
import Admin from "./components/AfterLogin/Admin/Admin";
import Navbar from "./components/Navbar/Navbar";
import KanbanBoard from "./kanban/kanbanBoard";
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/kanban" element={<KanbanBoard />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
          </Route>

          <Route path="/user" element={<PrivateLayout />}>
            <Route path="/user/nav" element={<Protected><Navbar/></Protected>} />
          </Route>

          <Route path="/role" element={<AdminLayout />}>
            <Route
              path="/role/admin"
              element={
                <RoleBasedAuth allowedRoles={["admin"]}>
                  <Admin />
                </RoleBasedAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
