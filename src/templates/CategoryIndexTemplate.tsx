import React, { useCallback } from "react";
import { graphql, PageProps } from "gatsby";
import { CategoryIndexPageQuery } from "../../graphql-types";
import Layout from "../components/Layout";
import { CategoryIndexContext } from "../../gatsby-node/createPages/createCategoryIndexPage";
import IndexPagination from "../components/IndexPagination";
import { genCategoryIndexSlug } from "../utils/genSlug";
import Index from "../components/Index";

const CategoryIndexTemplate: React.FC<
  PageProps<CategoryIndexPageQuery, CategoryIndexContext>
> = ({ data, pageContext }) => {
  if (!data) return null;

  const generateSlug = useCallback(
    (page: number) => {
      return genCategoryIndexSlug(pageContext.category, page);
    },
    [pageContext.category]
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
  query CategoryIndexPage($limit: Int!, $skip: Int!, $category: String!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//blog//" }
        frontmatter: { category: { eq: $category } }
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
          }
        }
      }
    }
  }
`;

export default CategoryIndexTemplate;
