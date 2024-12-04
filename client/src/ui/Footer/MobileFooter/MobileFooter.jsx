import StyledMobileFooter from "./MobileFooter.styles";

import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";

function MobileFooter() {
  return (
    <StyledMobileFooter>
      <div>
        <CiUser />
      </div>

      <div>
        <CiSearch />
      </div>

      <div>
        <CiShoppingCart />
      </div>
    </StyledMobileFooter>
  );
}

export default MobileFooter;
