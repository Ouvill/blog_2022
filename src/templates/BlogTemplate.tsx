import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { BlogPageQuery } from "../../graphql-types";
import Layout from "../components/Layout";
import { BlogPageContext } from "../../gatsby-node/createPages/createBlogPage";

const BlogTemplate: React.FC<PageProps<BlogPageQuery, BlogPageContext>> = ({
  data,
}) => {
  const { currentPost, next, prev } = data;
  if (!currentPost) return null;

  const { frontmatter, html } = currentPost;

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
            {next?.fields?.slug && <Link to={next.fields.slug}>Next</Link>}
          </li>
          <li>
            {prev?.fields?.slug && <Link to={prev.fields.slug}>Previous</Link>}
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPage($id: String, $nextId: String, $prevId: String) {
    currentPost: markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }

    next: markdownRemark(id: { eq: $nextId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }

    prev: markdownRemark(id: { eq: $prevId }) {
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
