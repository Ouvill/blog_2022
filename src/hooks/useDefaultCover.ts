import { graphql, useStaticQuery } from "gatsby";

const useDefaultCover = () => {
  const data = useStaticQuery<GatsbyTypes.UseDefaultCoverQuery>(
    graphql`
      query UseDefaultCover {
        defaultCover: file(relativePath: { eq: "defaults-cover.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              width: 320
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    `
  );
  return data.defaultCover;
};

export default useDefaultCover;
