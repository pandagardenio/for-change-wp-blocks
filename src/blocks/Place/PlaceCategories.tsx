import { CheckboxControl } from '@wordpress/components';
import React from 'react';

import { PostCategory } from '../../hoc';

export type PlaceCategoriesProps = {
    onChange: (categories: PostCategory[]) => void;
} & {
    categories: PostCategory[];
    selectedCategories: PostCategory[];
}

export const PlaceCategories: React.FunctionComponent<PlaceCategoriesProps> = (
    { categories = [], onChange, selectedCategories= [] }: PlaceCategoriesProps
): JSX.Element => {
    const selectedCategoriesSlug = selectedCategories
        .filter((category: PostCategory) => !!category)
        .map((category: PostCategory) => category.slug);
    
    const getCategory = (slug: string): PostCategory => categories.filter(
        (postCategory: PostCategory) => postCategory.slug === slug
    )[0];

    const handleChange = (category: PostCategory) => (isChecked: boolean): void => {
        const placeCategories = isChecked ?
            [...selectedCategoriesSlug, category.slug] :
            [
                ...selectedCategoriesSlug.slice(0, selectedCategoriesSlug.indexOf(category.slug)),
                ...selectedCategoriesSlug.slice(selectedCategoriesSlug.indexOf(category.slug) + 1)
            ];
        onChange(placeCategories.filter((slug: string) => !!slug).map(getCategory));
    };

    const isSelected = (slug: string): boolean => !!selectedCategories.filter((category: PostCategory) => {
        return category && category.slug === slug;
    })[0];

    return (
        <>
            {categories.map((category: PostCategory) => (
                <CheckboxControl
                    checked={isSelected(category.slug)}
                    label={category.name}
                    value={category.slug}
                    onChange={handleChange(category)}
                />
            ))}
        </>
    );
};
