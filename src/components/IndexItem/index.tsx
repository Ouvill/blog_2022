import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import useDefaultCover from "../../hooks/useDefaultCover";
import { css } from "@emotion/core";

type IndexItemProps = {
  title: string;
  link: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: any;
};

const cardCss = css`
  max-width: 320px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  transition: 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const gatsbyImageCss = css`
  overflow: hidden;
`;

const cartActionAreaCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const IndexItem: React.FC<IndexItemProps> = (props) => {
  const defaultCover = useDefaultCover();
  const image = getImage(props.image || defaultCover);

  return (
    <Card css={cardCss}>
      <CardActionArea css={cartActionAreaCss} component={Link} to={props.link}>
        {image && (
          <GatsbyImage
            css={gatsbyImageCss}
            className={"card-image"}
            image={image}
            alt={""}
          />
        )}
        <CardContent>
          <Typography>{props.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default IndexItem;
