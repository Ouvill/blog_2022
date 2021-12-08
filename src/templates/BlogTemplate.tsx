import React from 'react';
import { graphql, PageProps } from 'gatsby';
import {BlogPageQuery} from '../../graphql-types'

const BlogTemplate: React.FC<PageProps<BlogPageQuery>> = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export const pageQuery = graphql`
  query BlogPage ($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        slug
        title
      }
    }
  }
`

export default BlogTemplate;