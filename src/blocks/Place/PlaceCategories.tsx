import { CheckboxControl } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import React from 'react';

import { useCategories, useSelectedCategories } from '../../hooks';
import { isPlaceCategorySelected, PostCategory } from '../../models';

export type PlaceCategoriesProps = {}

export const PlaceCategories: React.FunctionComponent<PlaceCategoriesProps> = (): JSX.Element => {
    const categories = useCategories();
    const selectedCategories = useSelectedCategories();
    const dispatch = useDispatch();

    const handleChange = (category: PostCategory) => (isChecked: boolean): void => {
        const selectedCategoriesId = selectedCategories.map((selectedCategory: PostCategory) => selectedCategory.id);
        const placeCategoriesId: number[] = isChecked ?
            [...selectedCategoriesId, category.id] :
            [
                ...selectedCategoriesId.slice(0, selectedCategoriesId.indexOf(category.id)),
                ...selectedCategoriesId.slice(selectedCategoriesId.indexOf(category.id) + 1)
            ];
        dispatch('core/editor').editPost({
            categories: placeCategoriesId
        })
    };

    return (
        <>
            {categories.map((category: PostCategory) => (
                <CheckboxControl
                    checked={isPlaceCategorySelected(selectedCategories, category.id)}
                    label={category.name}
                    value={category.id}
                    onChange={handleChange(category)}
                />
            ))}
        </>
    );
};
