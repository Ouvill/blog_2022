import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { TagChip } from "./TagChip";
import Container from "@mui/material/Container";
import TOC, { TableOfContent } from "../TOC";

type Props = {
  title: string;
  tags?: string[];
  body: string;
  toc?: TableOfContent[];
};

const Article: React.FC<Props> = ({ title, tags, body, toc }) => {
  return (
    <Container maxWidth={"xl"}>
      <Grid container direction="row-reverse" spacing={2}>
        <Grid item xs={12} md={4} lg={3}>
          {toc && <TOC data={toc} />}
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <article>
            <h1>{title}</h1>
            <Stack direction={"row"} spacing={2}>
              {tags && tags.map((tag) => <TagChip key={tag} tag={tag} />)}
            </Stack>
            <MDXRenderer>{body}</MDXRenderer>
          </article>
        </Grid>
        <Grid item lg={3} />
      </Grid>
    </Container>
  );
};

export default Article;
