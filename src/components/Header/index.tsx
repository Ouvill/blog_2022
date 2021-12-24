import Search from "../search";
import React from "react";
import { Wrapper } from "./Wrapper";
import { Link } from "gatsby";

const searchIndices = [{ name: `Pages`, title: `Pages` }];
const Header = () => (
  <Wrapper>
    <Link to={"/"}>おーびるのブログ</Link>
    <Search indices={searchIndices} />
  </Wrapper>
);

export default Header;
