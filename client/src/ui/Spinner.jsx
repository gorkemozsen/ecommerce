import styled from "styled-components";

const StyledSpinner = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg); /* Başlangıç pozisyonu */
    }
    to {
      transform: rotate(360deg); /* 360 derece döner */
    }
  }
  && {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 4px solid #4fa94d; /* Dış çizgi rengi */
    border-radius: 50%;
    border-top-color: transparent; /* Üst kısmı görünmez yap */
    border-right-color: transparent; /* Sağ kısmı görünmez yap */
    animation: spin 1s linear infinite; /* Sürekli dönme efekti */
    margin-left: auto;
  }
`;

const Container = styled.div`
  && {
    text-align: center;
    margin-top: 10%;
  }
`;

function Spinner({
  size = 100,
  color = "var(--color-secondary)",
  speed = "1s",
}) {
  return (
    <StyledSpinner
      className="spinner"
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} transparent`,
        animationDuration: speed,
      }}
    ></StyledSpinner>
  );
}

Spinner.Container = Container;

export default Spinner;
