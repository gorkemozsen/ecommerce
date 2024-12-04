import { useState } from "react";
import styled, { css } from "styled-components";
import Seperator from "./Seperator";

const StyledProductInfo = styled.div`
  && {
    padding: 2rem;
    margin: 4rem 0;

    background-color: var(--color-white);

    & .titles {
      padding: 4rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 3rem;
    }
  }
`;

const Title = styled.h4`
  && {
    font-size: var(--fs-h6);

    @media (max-width: 992px) {
      font-size: var(--fs-xs);
    }
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-grey);
    position: relative;

    &::before {
      content: "";
      position: absolute;
      bottom: -4rem;
      left: 0;
      right: 100%;
      height: 4px;

      background-color: var(--color-secondary);
      transition: all 0.5s;
    }

    transition: all 0.5s;

    ${({ $active }) =>
      $active &&
      css`
        color: var(--color-black);

        &::before {
          right: 0;
        }
      `}
  }
`;

const Tab = styled.section`
  && {
    padding: 4rem;
  }
`;

function ProductInfo(tabs) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <StyledProductInfo>
      <div className="titles">
        {tabs.tabs.map((tab, i) => (
          <Title
            $active={i === currentTab}
            onClick={() => setCurrentTab(i)}
            key={tab.title}
          >
            {tab.title}
          </Title>
        ))}
      </div>

      <Seperator $bg="var(--color-white-600)" />

      {tabs.tabs.map((tab, i) => {
        if (i === currentTab) return <Tab key={tab.title}>{tab.content}</Tab>;
      })}
    </StyledProductInfo>
  );
}

export default ProductInfo;
