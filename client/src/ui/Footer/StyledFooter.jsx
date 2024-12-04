import styled from "styled-components";

const StyledFooter = styled.footer`
  && {
    background-color: #1a2c2a;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(https://demo2.wpopal.com/strollik5/wp-content/uploads/2019/06/h2_bgfooter.jpg);

    padding: 3rem 8rem;

    font-size: var(--fs-small);
    color: var(--color-white-500);

    & form {
      padding: 3rem;
      & input {
        min-width: 70%;
      }
      & label {
        text-transform: uppercase;
        letter-spacing: 0.3rem;

        font-size: var(--fs-medium);
      }
    }

    & .contact-info {
      padding: 3rem;

      line-height: 3rem;

      & h2 {
        color: var(--color-white);
        margin-bottom: 3rem;
      }

      & p {
        & span {
          color: var(--color-white);
        }
      }
    }

    & .footer-bottom {
      padding: 0 3rem;
    }
  }
`;

export default StyledFooter;
