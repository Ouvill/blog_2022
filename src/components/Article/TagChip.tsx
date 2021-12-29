import React from "react";
import useGenTagSlug from "../../hooks/useGenTagSlug";
import Chip from "@mui/material/Chip";
import { Link } from "gatsby";

type TagChipsProps = {
  tag: string;
};

export const TagChip: React.FC<TagChipsProps> = (props) => {
  const [slug] = useGenTagSlug(props.tag);
  return (
    <Chip
      key={props.tag}
      label={props.tag}
      component={Link}
      to={slug}
      clickable
    />
  );
};
