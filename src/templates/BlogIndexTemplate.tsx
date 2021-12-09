import React from "react";
import { graphql, PageProps } from "gatsby";
import { BlogIndexPageQuery } from "../../graphql-types";

const BlogIndexTemplate: React.FC<PageProps<BlogIndexPageQuery>> = ({
  data,
}) => {
  if (!data) return null;

  return (
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        if (
          !node.frontmatter ||
          !node.frontmatter.title ||
          !node.frontmatter.date
        )
          return null;
        return (
          <div key={node.id}>
            <h3>{node.frontmatter.title}</h3>
            <p>{node.frontmatter.date}</p>
          </div>
        );
      })}
    </div>
  );
};

export const pageQuery = graphql`
  query BlogIndexPage($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "//blog//" } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
          }
        }
      }
    }
  }
`;

export default BlogIndexTemplate;
