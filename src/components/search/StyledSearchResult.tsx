import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";
import SearchResult from "./SearchResult";

const Popover = (theme: Theme) => css`
  max-height: 80vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 100%;
  margin-top: 0.5em;
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 1em;
  border-radius: 2px;
  background: ${theme.background};
`;

type StyledSearchResult = {
  show: boolean;
};

export default styled(SearchResult)<StyledSearchResult>`
  display: ${(props) => (props.show ? `block` : `none`)};

  ${(props) => Popover(props.theme)}

  .HitCount {
    display: flex;
    justify-content: flex-end;
  }

  .ais-Hits {
    ul {
      list-style: none;
      margin-left: 0;
    }

    li.ais-Hits-item {
      margin-bottom: 1em;

      a {
        color: ${({ theme }) => theme.foreground};

        h4 {
          margin-bottom: 0.2em;
        }
      }
    }
  }

  .ais-PoweredBy {
    display: flex;
    justify-content: flex-end;
    font-size: 80%;

    svg {
      width: 70px;
    }
  }
`;
