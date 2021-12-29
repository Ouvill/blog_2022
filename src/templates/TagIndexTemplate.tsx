import React, { useCallback } from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { TagIndexPageContext } from "../../gatsby-node/createPages/createTagsPage";
import IndexPagination from "../components/IndexPagination";
import { genCategoryIndexSlug } from "../utils/genSlug";
import Index from "../components/Index";

const TagIndexTemplate: React.FC<
  PageProps<GatsbyTypes.TagIndexPageQuery, TagIndexPageContext>
> = ({ data, pageContext }) => {
  if (!data) return null;
  const generateSlug = useCallback(
    (page: number) => {
      return genCategoryIndexSlug(pageContext.tag, page);
    },
    [pageContext.tag]
  );
  return (
    <Layout>
      <div>
        <Index data={data} />

        <IndexPagination
          currentPage={pageContext.currentPage}
          numPages={pageContext.numPages}
          generateSlug={generateSlug}
        />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagIndexPage($limit: Int!, $skip: Int!, $tag: String!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//blog//" }
        frontmatter: { tags: { eq: $tag } }
      }
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

export default TagIndexTemplate;
