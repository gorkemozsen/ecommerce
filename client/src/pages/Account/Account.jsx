import { Outlet } from "react-router-dom";
import StyledAccount from "./Account.styles";
import AccountNav from "../../features/account/AccountNav";

function Account() {
  return (
    <StyledAccount>
      <AccountNav />
      <Outlet />
    </StyledAccount>
  );
}

export default Account;
