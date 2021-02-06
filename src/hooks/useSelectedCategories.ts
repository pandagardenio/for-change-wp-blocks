import { useSelect } from "@wordpress/data";

import { useCategories } from "./useCategories";
import { getPostCategory, PostCategory } from "../models";

export const useSelectedCategories = () => useSelect(select => {
    const postCategories = useCategories();
    return select('core/editor').getEditedPostAttribute('categories').map((categoryId: number) => {
        return getPostCategory(postCategories, categoryId);
    }).filter((postCategory: PostCategory) => !!postCategory);
});