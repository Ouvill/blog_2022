import React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { BlogPageContext } from "../../gatsby-node/createPages/createBlogPage";
import Article from "../components/Article";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { PageNav } from "../components/PageNav";

const BlogTemplate: React.FC<
  PageProps<GatsbyTypes.BlogPageQuery, BlogPageContext>
> = ({ data }) => {
  const { currentPost, next, prev } = data;
  if (!currentPost) return null;

  const { frontmatter, body, tableOfContents } = currentPost;

  if (!frontmatter) return null;
  if (!body) return null;
  return (
    <Layout>
      <div>
        <Article
          title={frontmatter.title}
          tags={frontmatter.tags as string[]}
          body={body}
          // @ts-ignore
          toc={tableOfContents?.items}
        />

        <Container maxWidth={"xl"}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={"auto"} />
            <Grid item xs={12} md={8} lg={6} alignItems={"center"}>
              <PageNav
                next={{
                  title: next?.frontmatter?.title,
                  slug: next?.fields?.slug,
                }}
                prev={{
                  title: prev?.frontmatter?.title,
                  slug: prev?.fields?.slug,
                }}
              />
            </Grid>
            <Grid item lg={"auto"} />
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPage($id: String, $nextId: String, $prevId: String) {
    currentPost: mdx(id: { eq: $id }) {
      body
      tableOfContents
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
