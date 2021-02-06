import { useSelect } from "@wordpress/data";

import { PostCategory, isPlaceCategory } from "../models";

export const useCategories = () => useSelect(select => {
    const postCategories = select('core').getEntityRecords('taxonomy', 'category', {
        per_page : -1,
        status : 'publish'
    }) as PostCategory[] || [];

    return postCategories.filter(({ id }: PostCategory) => isPlaceCategory(postCategories, id));
});