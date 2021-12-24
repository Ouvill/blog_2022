import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { BlogPageQuery } from "../../graphql-types";
import Layout from "../components/Layout";
import { BlogPageContext } from "../../gatsby-node/createPages/createBlogPage";

const BlogTemplate: React.FC<PageProps<BlogPageQuery, BlogPageContext>> = ({
  data,
  pageContext,
}) => {
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
        <ul>
          <li>
            {pageContext.next?.fields.slug && (
              <Link to={pageContext.next.fields.slug}>Next</Link>
            )}
          </li>
          <li>
            {pageContext.prev?.fields.slug && (
              <Link to={pageContext.prev.fields.slug}>Previous</Link>
            )}
          </li>
        </ul>
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
