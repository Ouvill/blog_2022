import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

const globalStyles = css`
  html {
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
  }
`;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Wrapper>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Wrapper>
    </>
  );
};

export default Layout;
