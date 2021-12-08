import React from 'react';
import { graphql, PageProps } from 'gatsby';
import {BlogIndexPageQuery} from '../../graphql-types'

const BlogIndexTemplate: React.FC<PageProps<BlogIndexPageQuery>> = ({ data }) => {
  return (
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h3>{node.frontmatter.title}</h3>
          <p>{node.frontmatter.date}</p>
        </div>
      ))}
    </div>
  );
};

export const pageQuery = graphql`
  query BlogIndexPage ($limit: Int!, $skip: Int!) {
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
`

export default BlogIndexTemplate;
