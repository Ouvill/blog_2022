import React from "react";
import { graphql, Link, PageProps } from "gatsby";
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
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;

export default BlogIndexTemplate;
