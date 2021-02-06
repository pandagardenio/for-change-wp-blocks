export type PostCategory = {
    id: number;
    name: string;
    slug: string;
    parent: number;
}

export const getPlaceRootCategory = (postCategories: PostCategory[]) => ((postCategories || []).filter(
    (postCategory: PostCategory) => postCategory.slug === 'place'
)[0]) as PostCategory | undefined;

export const getPostCategory = (postCategories: PostCategory[], id: number): PostCategory | undefined =>
    postCategories.filter((postCategory: PostCategory) => postCategory.id === id)[0];

export const isPlaceCategory = (postCategories: PostCategory[], id: number): boolean => {
    const postCategory = getPostCategory(postCategories, id);

    if (!postCategory || !postCategory.parent) {
        return false;
    }

    if (getPlaceRootCategory(postCategories) && (postCategory.parent === getPlaceRootCategory(postCategories).id)) {
        return true;
    }

    return isPlaceCategory(postCategories, postCategory.parent);
};

export const isPlaceCategorySelected = (selectedPostCategories: PostCategory[], postCategoryId: number): boolean =>
    !!selectedPostCategories.filter((postCategory: PostCategory) => postCategory.id === postCategoryId)[0];