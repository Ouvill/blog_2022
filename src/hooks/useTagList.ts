import { graphql, useStaticQuery } from "gatsby";
import { UseTagListQuery } from "../../graphql-types";
import { genTagIndexSlug } from "../utils/genSlug";

const useTagList = () => {
  const data = useStaticQuery<UseTagListQuery>(graphql`
    query UseTagList {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return data.allMarkdownRemark.group.flatMap((item) =>
    item.fieldValue
      ? [
          {
            name: item.fieldValue,
            slug: genTagIndexSlug(item.fieldValue),
            count: item.totalCount,
          },
        ]
      : []
  );
};

export default useTagList;
