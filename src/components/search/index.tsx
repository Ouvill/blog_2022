import algoliasearch from "algoliasearch/lite";
import { default as React, useMemo, useRef, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import StyledSearchRoot from "./StyledSearchRoot";
import StyledSearchBox from "./StyledSearchBox";
import StyledSearchResult from "./StyledSearchResult";
import { InstantSearch } from "react-instantsearch-dom";
import useClickOutside from "./useClickOutside";
import { Indices } from "./type";

const theme = {
  foreground: "#050505",
  background: "white",
  faded: "#888",
};

type SearchProps = {
  indices: Indices;
};

const Search: React.FC<SearchProps> = ({ indices }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  // const rootRef = createRef();
  const [query, setQuery] = useState("");
  const [hasFocus, setFocus] = useState(false);
  const searchClient = useMemo(() => {
    if (
      !process.env.GATSBY_ALGOLIA_APP_ID ||
      !process.env.GATSBY_ALGOLIA_SEARCH_KEY
    ) {
      return null;
    }
    return algoliasearch(
      process.env.GATSBY_ALGOLIA_APP_ID,
      process.env.GATSBY_ALGOLIA_SEARCH_KEY
    );
  }, []);

  useClickOutside(rootRef, () => setFocus(false));

  return (
    <ThemeProvider theme={theme}>
      <StyledSearchRoot ref={rootRef}>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <StyledSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
          <StyledSearchResult
            show={!!(query && query.length > 0 && hasFocus)}
            indices={indices}
          />
        </InstantSearch>
      </StyledSearchRoot>
    </ThemeProvider>
  );
};

export default Search;
