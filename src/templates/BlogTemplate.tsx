import React from "react";
import { graphql, PageProps } from "gatsby";
import { BlogPageQuery } from "../../graphql-types";
import Layout from "../components/Layout";

const BlogTemplate: React.FC<PageProps<BlogPageQuery>> = ({ data }) => {
  const { markdownRemark } = data;
  if (!markdownRemark) return null;

  const { frontmatter, html } = markdownRemark;

  if (!frontmatter) return null;
  if (!html) return null;
  return (
    <Layout>
      <div>
        <h1>{frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPage($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;

export default BlogTemplate;
