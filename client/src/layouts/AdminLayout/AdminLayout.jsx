import { Outlet } from "react-router-dom";
import Header from "../../ui/Dashboard/Header/Header";
import SideBar from "../../ui/Dashboard/SideBar/SideBar";
import StyledAdminLayout from "./AdminLayout.styles";
import { useState } from "react";

function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState();

  return (
    <StyledAdminLayout className={menuOpen ? "active" : ""}>
      <Header />
      <SideBar menuOpen={menuOpen} onMenuOpen={setMenuOpen} />
      <Outlet />
    </StyledAdminLayout>
  );
}

export default AdminLayout;
