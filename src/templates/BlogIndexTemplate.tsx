import React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { BlogIndexPageContext } from "../../gatsby-node/createPages/createBlogIndexPage";
import IndexPagination from "../components/IndexPagination";
import { genBlogIndexSlug } from "../utils/genSlug";
import Index from "../components/Index";

const BlogIndexTemplate: React.FC<
  PageProps<GatsbyTypes.BlogIndexPageQuery, BlogIndexPageContext>
> = ({ data, pageContext }) => {
  if (!data) return null;

  return (
    <Layout>
      <Index data={data} />
      <IndexPagination
        currentPage={pageContext.currentPage}
        numPages={pageContext.numPages}
        generateSlug={genBlogIndexSlug}
      />
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
                  width: 320
                  height: 180
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
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
