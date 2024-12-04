import { FaInstagram } from "react-icons/fa";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import styled from "styled-components";

const StyledSocialIcon = styled.a`
  && {
    border-radius: 100%;
    border: 2px solid var(--color-white-t);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 4rem;
    height: 4rem;

    transition: all 0.4s;

    &:hover {
      border-color: var(--color-white);
    }

    & svg {
      font-size: var(--fs-large);
    }
  }
`;

// eslint-disable-next-line react/prop-types
function SocialIcon({ variant }) {
  if (typeof variant !== "string")
    throw new Error(`Invalid prop type: ${typeof variant}`);

  return (
    <StyledSocialIcon href="#">
      {variant === "facebook" && <FaFacebookF color="var(--color-white)" />}
      {variant === "instagram" && <FaInstagram color="var(--color-white)" />}
      {variant === "twitter" && <FaTwitter color="var(--color-white)" />}
    </StyledSocialIcon>
  );
}

export default SocialIcon;
