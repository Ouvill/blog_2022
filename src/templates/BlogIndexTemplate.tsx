import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { BlogIndexPageQuery } from "../../graphql-types";
import Layout from "../components/Layout";
import { BlogIndexPageContext } from "../../gatsby-node/createPages/createBlogIndexPage";
import IndexPagination from "../components/IndexPagination";
import { genBlogIndexSlug } from "../utils/genSlug";

const BlogIndexTemplate: React.FC<
  PageProps<BlogIndexPageQuery, BlogIndexPageContext>
> = ({ data, pageContext }) => {
  if (!data) return null;

  return (
    <Layout>
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

        <IndexPagination
          currentPage={pageContext.currentPage}
          numPages={pageContext.numPages}
          generateSlug={genBlogIndexSlug}
        />
      </div>
    </Layout>
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
