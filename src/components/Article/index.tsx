import { MDXRenderer } from "gatsby-plugin-mdx";
import Chip from "@mui/material/Chip";
import React from "react";
import Stack from "@mui/material/Stack";

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
        {tags && tags.map((tag) => <Chip key={tag} label={tag} clickable />)}
      </Stack>
      <MDXRenderer>{body}</MDXRenderer>
    </article>
  );
};

export default Article;
