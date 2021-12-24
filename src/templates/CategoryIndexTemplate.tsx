import React, { useCallback } from "react";
import { graphql, Link, PageProps } from "gatsby";
import { CategoryIndexPageQuery } from "../../graphql-types";
import Layout from "../components/Layout";
import { CategoryIndexContext } from "../../gatsby-node/createPages/createCategoryIndexPage";
import IndexPagination from "../components/IndexPagination";
import { genCategoryIndexSlug } from "../utils/genSlug";

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
          generateSlug={generateSlug}
        />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query CategoryIndexPage($limit: Int!, $skip: Int!, $category: String!) {
    allMarkdownRemark(
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
