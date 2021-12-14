import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { SearchBoxProvided } from "react-instantsearch-core";
import { Search as SearchIcon } from "@styled-icons/fa-solid";

export type Props = {
  className?: string;
  onFocus?: () => void;
  hasFocus?: boolean;
} & Partial<SearchBoxProvided>;

export default connectSearchBox<Props>(
  ({ refine, currentRefinement, className, onFocus }) => {
    return (
      <form className={className}>
        <input
          className="SearchInput"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => (refine ? refine(e.target.value) : null)}
          value={currentRefinement}
          onFocus={onFocus}
        />
        <SearchIcon className={"SearchIcon"} />
      </form>
    );
  }
);
