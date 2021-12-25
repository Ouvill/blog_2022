import React from "react";
import {
  BlogIndexPageQuery,
  CategoryIndexPageQuery,
  TagIndexPageQuery,
} from "../../../graphql-types";
import { Link } from "gatsby";

type Props = {
  data: BlogIndexPageQuery | CategoryIndexPageQuery | TagIndexPageQuery;
};

const Index: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.allMdx.edges.map(({ node }) => {
        if (
          !node.frontmatter ||
          !node.frontmatter.title ||
          !node.frontmatter.date ||
          !node.fields?.slug
        )
          return null;
        return (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <h3>{node.frontmatter.title}</h3>
            </Link>
            <p>{node.frontmatter.date}</p>
          </div>
        );
      })}
    </>
  );
};

export default Index;
