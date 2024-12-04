/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  && {
    background-color: var(--color-white);
    padding: 2rem 0;
  }
`;

const CommonRow = styled.div`
  && {
    display: grid;
    grid-template-columns: ${(props) => props.columns};
    column-gap: 1.2rem;
    row-gap: 2rem;
    align-items: center;

    @media (max-width: 992px) {
      display: flex;
      justify-content: space-between;
    }

    & div {
      overflow: hidden;
      padding: 1rem;
    }
  }
`;

const StyledHeader = styled(CommonRow)`
  && {
    text-transform: uppercase;
    padding: 2rem;
  }
`;

const StyledRow = styled(CommonRow)`
  && {
    padding: 2rem;
    margin-bottom: 2rem;

    border: 1px solid var(--color-white-400);
    border-radius: 8px;

    background-color: var(--color-white-200);
  }
`;

const StyledBody = styled.section`
  && {
    margin: 0.4rem 0;
  }
`;

const Footer = styled.footer`
  && {
  }
`;

const Empty = styled.p`
  && {
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    margin: 2.4rem;
  }
`;

const TableContext = createContext();

function Table({ props, columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader className="d-none d-md-grid" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow
      className="d-flex flex-wrap align-items-start align-items-md-center d-md-grid"
      columns={columns}
    >
      {children}
    </StyledRow>
  );
}

function Body({ data, render, isPending }) {
  if (!data?.length && isPending)
    return <Empty>No data to show at the moment.</Empty>;

  return <StyledBody>{data?.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
