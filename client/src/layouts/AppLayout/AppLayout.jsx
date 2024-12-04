import { Outlet } from "react-router-dom";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import StyledAppLayout from "./AppLayout.styles";

function AppLayout() {
  return (
    <StyledAppLayout className="container-xl mx-xl-auto my-xl-5">
      <Header />

      <Outlet />

      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
