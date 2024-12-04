import Button from "../Button";
import Input from "../Input";
import Seperator from "../Seperator";
import SocialIcon from "../SocialIcon";
import MobileFooter from "./MobileFooter/MobileFooter";
import StyledFooter from "./StyledFooter";

function Footer() {
  const vpWidth = window.innerWidth;

  return (
    <>
      {/* {vpWidth < 768 && <MobileFooter />} */}
      <StyledFooter className="row">
        <form className="d-flex align-items-center gap-3 justify-content-center flex-md-row flex-column">
          <label htmlFor="emailSubscribe">The Latest From Us</label>
          <Input id="emailSubscribe" type="email" placeholder="Your Email" />
          <Button $variant="secondary">SUBMIT</Button>
        </form>
        <Seperator />

        <div className="contact-info col-md-12">
          <h2>Contact Info</h2>
          <p>
            <span>Address: </span>44 Canal Center Plaza #200, Alexandria, VA
            22314, USA
          </p>

          <p>
            <span>Hotline: </span>(800) 123 1234 567
          </p>

          <p>
            <span>Email: </span>contact@company.com
          </p>
        </div>

        <Seperator />

        <div className="footer-bottom d-flex align-items-center justify-content-between py-5 ">
          <p>Copyright © 2024. All rights reserved.</p>
          <div className="d-flex gap-3 mt-5">
            <SocialIcon variant="facebook" />
            <SocialIcon variant="instagram" />
            <SocialIcon variant="twitter" />
          </div>
        </div>
      </StyledFooter>
    </>
  );
}

export default Footer;
