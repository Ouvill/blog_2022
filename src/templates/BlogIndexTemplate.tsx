import React from "react";
import { graphql, PageProps } from "gatsby";
import { BlogIndexPageQuery } from "../../graphql-types";
import Layout from "../components/Layout";
import { BlogIndexPageContext } from "../../gatsby-node/createPages/createBlogIndexPage";
import IndexPagination from "../components/IndexPagination";
import { genBlogIndexSlug } from "../utils/genSlug";
import Index from "../components/Index";

const BlogIndexTemplate: React.FC<
  PageProps<BlogIndexPageQuery, BlogIndexPageContext>
> = ({ data, pageContext }) => {
  if (!data) return null;

  return (
    <Layout>
      <div>
        <Index data={data} />
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
    allMdx(
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
            cover {
              childImageSharp {
                gatsbyImageData(
                  width: 200
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`;

export default BlogIndexTemplate;
