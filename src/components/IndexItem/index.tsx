import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import useDefaultCover from "../../hooks/useDefaultCover";
import styled from "@emotion/styled";

type IndexItemProps = {
  title: string;
  link: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: any;
};

const StyledCard = styled(Card)`
  max-width: 320px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const IndexItem: React.FC<IndexItemProps> = (props) => {
  const defaultCover = useDefaultCover();
  const image = getImage(props.image || defaultCover);

  return (
    <StyledCard>
      <CardActionArea component={Link} to={props.link}>
        {image && <GatsbyImage image={image} alt={""} />}
        <CardContent>
          <Typography>{props.title}</Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default IndexItem;
