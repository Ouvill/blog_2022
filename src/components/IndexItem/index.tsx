import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

type IndexItemProps = {
  title: string;
  link: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

const IndexItem: React.FC<IndexItemProps> = (props) => {
  return (
    <Card>
      <CardActionArea component={Link} to={props.link}>
        <StaticImage src={"./site-header.jpg"} alt={""} width={400} />
        <CardContent>
          <Typography>{props.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default IndexItem;
