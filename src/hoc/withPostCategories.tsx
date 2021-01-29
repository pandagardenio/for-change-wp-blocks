import { withSelect } from '@wordpress/data';
import React from 'react';

export type PostCategory = {
    id: number;
    name: string;
    slug: string;
    parent: number;
}

export type WithPostCategoriesProps = {
    categories: PostCategory[];
}

export function withPostCategories<T extends WithPostCategoriesProps = WithPostCategoriesProps>(
    WrappedComponent: React.ComponentType<T>
): React.ComponentType<Exclude<T, keyof WithPostCategoriesProps>> {
    const WithPostCategoriesComponent =  withSelect<WithPostCategoriesProps, T>(select => {
        const postCategories = (select('core').getEntityRecords('taxonomy', 'category', {
            per_page : -1,
            status : 'publish'
        }) as PostCategory[]) || [];

        const placeRootCategory = ((postCategories || []).filter(
            (postCategory: PostCategory) => postCategory.slug === 'place'
        )[0]) as PostCategory | undefined;

        const isPlaceCategory = (id: number): boolean => {
            const postCategory = getPostCategory(id);

            if (!postCategory || !postCategory.parent) {
                return false;
            }

            if (placeRootCategory && (postCategory.parent === placeRootCategory.id)) {
                return true;
            }

            return isPlaceCategory(postCategory.parent);
        };

        const getPostCategory = (id: number): PostCategory | undefined =>
            postCategories.filter((postCategory: PostCategory) => postCategory.id === id)[0] || {
                id: 1,
                name: 'Uncategorized',
                slug: 'uncategorized',
                parent: 0
            };

        return {
            categories: postCategories.filter(({ id }: PostCategory) => isPlaceCategory(id))
        };
    })(WrappedComponent);

    // @ts-ignore;
    return WithPostCategoriesComponent;
}
