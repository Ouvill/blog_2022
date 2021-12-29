import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { BlogPageContext } from "../../gatsby-node/createPages/createBlogPage";
import Article from "../components/Article";

const BlogTemplate: React.FC<
  PageProps<GatsbyTypes.BlogPageQuery, BlogPageContext>
> = ({ data }) => {
  const { currentPost, next, prev } = data;
  if (!currentPost) return null;

  const { frontmatter, body } = currentPost;

  if (!frontmatter) return null;
  if (!body) return null;
  return (
    <Layout>
      <div>
        <Article
          title={frontmatter.title}
          tags={frontmatter.tags as string[]}
          body={body}
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
    currentPost: mdx(id: { eq: $id }) {
      body
      fields {
        slug
      }
      frontmatter {
        title
        tags
      }
    }

    next: mdx(id: { eq: $nextId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }

    prev: mdx(id: { eq: $prevId }) {
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
