import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Stack from "@mui/material/Stack";
import { TagChip } from "./TagChip";

type Props = {
  title: string;
  tags?: string[];
  body: string;
};

const Article: React.FC<Props> = ({ title, tags, body }) => {
  return (
    <article>
      <h1>{title}</h1>
      <Stack direction={"row"} spacing={2}>
        {tags && tags.map((tag) => <TagChip key={tag} tag={tag} />)}
      </Stack>
      <MDXRenderer>{body}</MDXRenderer>
    </article>
  );
};

export default Article;
