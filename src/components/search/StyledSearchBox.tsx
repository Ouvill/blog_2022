import styled from "@emotion/styled";
import SearchBox, { Props as SearchBoxProps } from "./SearchBox";
import { css, Theme } from "@emotion/react";

const open = (theme: Theme) => css`
  width: 10em;
  background: ${theme.background};
  cursor: text;
  margin-left: -1.6em;
  padding-left: 1.6em;
`;

const closed = css`
  widows: 0;
  background: transparent;
  cursor: pointer;
  margin-left: -1em;
  padding-left: 1em;
`;

export default styled(SearchBox)<SearchBoxProps>`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 0;

  .SearchInput {
    outline: none;
    border: ${(props) => (props.hasFocus ? "auto" : "none")};
    font-size: 1em;
    transition: 100ms;
    border-radius: 2px;
    color: ${({ theme }) => theme.foreground};
    ::placeholder {
      color: ${({ theme }) => theme.faded};
    }
    ${({ hasFocus, theme }) => (hasFocus ? open(theme) : closed)};
  }

  .SearchIcon {
    width: 1em;
    margin: 0.3em;
    color: ${({ theme }) => theme.foreground};
    pointer-events: none;
  }
`;
