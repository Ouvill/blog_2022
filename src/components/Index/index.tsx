import React from "react";
import IndexItem from "../IndexItem";
import Grid from "@mui/material/Grid";

type Props = {
  data:
    | GatsbyTypes.BlogIndexPageQuery
    | GatsbyTypes.CategoryIndexPageQuery
    | GatsbyTypes.TagIndexPageQuery;
};

const Index: React.FC<Props> = ({ data }) => {
  return (
    <Grid container spacing={4}>
      {data.allMdx.edges.map(({ node }) => {
        if (
          !node.frontmatter ||
          !node.frontmatter.title ||
          !node.frontmatter.date ||
          !node.fields?.slug
        )
          return null;
        return (
          <Grid item xs={12} sm={6} md={4} key={node.id}>
            <IndexItem
              title={node.frontmatter.title}
              link={node.fields.slug}
              image={node.frontmatter.cover}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Index;
