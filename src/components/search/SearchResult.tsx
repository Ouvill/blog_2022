import { Link } from "gatsby";
import { default as React } from "react";
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom";
import { Indices, Index as IndexType } from "./type";
import { PageRecord } from "../../utils/algolia";

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  return hitCount > 0 ? (
    <div className="HitCount">
      <span>{hitCount}</span>
      {hitCount === 1 ? " result" : " results"}
    </div>
  ) : null;
});

const PageHit = ({ hit }: { hit: PageRecord }) => (
  <div>
    <Link to={hit.slug}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
);

type HitsInIndexProps = {
  index: IndexType;
};

const HitsInIndex: React.FC<HitsInIndexProps> = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits hitComponent={PageHit} />
  </Index>
);

type SearchResultProps = {
  indices: Indices;
  className?: string;
};

const SearchResult: React.FC<SearchResultProps> = ({ indices, className }) => (
  <div className={className}>
    {indices.map((index) => (
      <HitsInIndex key={index.name} index={index} />
    ))}
    <PoweredBy />
  </div>
);

export default SearchResult;
