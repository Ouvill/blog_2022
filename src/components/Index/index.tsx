import React from "react";
import IndexItem from "../IndexItem";

type Props = {
  data:
    | GatsbyTypes.BlogIndexPageQuery
    | GatsbyTypes.CategoryIndexPageQuery
    | GatsbyTypes.TagIndexPageQuery;
};

const Index: React.FC<Props> = ({ data }) => {
  return (
    <div style={{ display: "flex" }}>
      {data.allMdx.edges.map(({ node }) => {
        if (
          !node.frontmatter ||
          !node.frontmatter.title ||
          !node.frontmatter.date ||
          !node.fields?.slug
        )
          return null;
        return (
          <IndexItem
            key={node.id}
            title={node.frontmatter.title}
            link={node.fields.slug}
            image={node.frontmatter.cover}
          />
        );
      })}
    </div>
  );
};

export default Index;
