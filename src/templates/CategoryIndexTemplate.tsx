import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { CategoryIndexPageQuery } from "../../graphql-types";
import Layout from "../components/Layout";

type PageContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
};

const CategoryIndexTemplate: React.FC<
  PageProps<CategoryIndexPageQuery, PageContext>
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

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {Array.from({ length: pageContext.numPages }, (_, i) => (
              <Link
                key={`pagination-number${i + 1}`}
                to={i === 0 ? "/" : `/indexes/${i + 1}`}
                style={{
                  padding: "0.5rem",
                  margin: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textAlign: "center",
                  width: "2rem",
                  height: "2rem",
                  lineHeight: "2rem",
                  backgroundColor:
                    pageContext.currentPage === i + 1 ? "#ccc" : "white",
                }}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        </div>
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
