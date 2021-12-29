import { css } from "@emotion/react";
import { Link } from "gatsby";
import Divider from "@mui/material/Divider";
import React from "react";

const navStyle = css`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;
const navItemStyle = css`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const navItemInside = css`
  height: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const prevStyle = css`
  justify-content: start;
`;
const nextStyle = css`
  justify-content: end;
`;

export const PageNav = ({
  next,
  prev,
}: {
  next?: { title?: string; slug?: string };
  prev?: { title?: string; slug?: string };
}) => {
  return (
    <nav css={navStyle}>
      <div css={navItemStyle}>
        {prev?.slug && (
          <Link to={prev.slug}>
            <div css={[navItemInside, prevStyle]}>
              <div>{"<"}</div>
              <div>{prev.title}</div>
            </div>
          </Link>
        )}
      </div>
      <Divider orientation={"vertical"} flexItem />
      <div css={navItemStyle}>
        {next?.slug && (
          <Link to={next.slug}>
            <div css={[navItemInside, nextStyle]}>
              <div>{next.title}</div>
              <div>{">"}</div>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};
