import React from "react";
import Search from "./search";

const searchIndices = [{ name: `Pages`, title: `Pages` }];

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <div>
        <Search indices={searchIndices} />
      </div>
      {children}
    </div>
  );
};

export default Layout;
