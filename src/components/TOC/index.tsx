import { Typography } from "@mui/material";
import { Link } from "gatsby";
import { css } from "@emotion/react";

export type TableOfContent = {
  title: string;
  url: string;
  items?: TableOfContent[];
};

type Props = {
  data: TableOfContent[];
};

const listStyle = css`
  list-style: none;
  line-height: 1.5;
  padding: 0;
  margin: 0;
`;

const subListStyle = css`
  margin-left: 1rem;
`;

const TOC: React.VFC<Props> = ({ data }) => {
  return (
    <div>
      <Typography>目次</Typography>
      <ul css={listStyle}>
        {data.map((item) => (
          <li key={item.title}>
            <Link to={item.url}>
              <Typography>{item.title}</Typography>
            </Link>
            {item.items && (
              <ul css={[listStyle, subListStyle]}>
                {item.items.map((subItem) => (
                  <li key={subItem.title}>
                    <Link to={subItem.url}>
                      <Typography>{subItem.title}</Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TOC;
