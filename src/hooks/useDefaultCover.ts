import { graphql, useStaticQuery } from "gatsby";
import { UseDefaultCoverQuery } from "../../graphql-types";

const useDefaultCover = () => {
  const data = useStaticQuery<UseDefaultCoverQuery>(
    graphql`
      query UseDefaultCover {
        site {
          siteMetadata {
            defaultCover
          }
        }
      }
    `
  );
  return data.site?.siteMetadata?.defaultCover;
};

export default useDefaultCover;
