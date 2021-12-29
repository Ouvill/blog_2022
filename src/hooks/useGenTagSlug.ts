import { genTagIndexSlug } from "../utils/genSlug";
import { useCallback, useMemo } from "react";
import { navigate } from "gatsby";

const useGenTagSlug = (
  tag: string
): [slug: string, navigateSlug: () => void] => {
  const slug = useMemo(() => genTagIndexSlug(tag), [tag]);

  const navigateSlug = useCallback(() => {
    navigate(slug);
  }, [slug]);

  return [slug, navigateSlug];
};

export default useGenTagSlug;
