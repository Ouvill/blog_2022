import React, { useCallback } from "react";
import { graphql, Link, PageProps } from "gatsby";
import { TagIndexPageQuery } from "../../graphql-types";
import Layout from "../components/Layout";
import { TagIndexPageContext } from "../../gatsby-node/createPages/createTagsPage";
import IndexPagination from "../components/IndexPagination";
import { genCategoryIndexSlug } from "../utils/genSlug";

const TagIndexTemplate: React.FC<
  PageProps<TagIndexPageQuery, TagIndexPageContext>
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
  query TagIndexPage($limit: Int!, $skip: Int!, $tag: String!) {
    allMarkdownRemark(
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
          }
        }
      }
    }
  }
`;

export default TagIndexTemplate;
