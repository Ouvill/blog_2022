import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Stack from "@mui/material/Stack";
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
    <Container maxWidth={"lg"}>
      {toc && <TOC data={toc} />}
      <article>
        <h1>{title}</h1>
        <Stack direction={"row"} spacing={2}>
          {tags && tags.map((tag) => <TagChip key={tag} tag={tag} />)}
        </Stack>
        <MDXRenderer>{body}</MDXRenderer>
      </article>
    </Container>
  );
};

export default Article;
