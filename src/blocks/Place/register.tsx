import { registerBlockType, BlockEditProps } from '@wordpress/blocks';
import React, { useEffect } from 'react';

import { Place, SerialisedPlace } from './Place';
import { withPostCategories, withPostId, withPostTitle, PostCategory } from '../../hoc';
import { Shop } from './PhysicalShop';

type PlaceBlockProps = BlockEditProps<SerialisedPlace> & {
    categories: PostCategory[];
    postId: number;
    postTitle: string;
};

type LegacyShop = Shop & {
    latitude: number;
    longitude: number;
};

type LegacyPlace = SerialisedPlace & {
    category: string;
};

const PlaceBlock: React.FunctionComponent<PlaceBlockProps> = (
    { attributes, categories, postId, postTitle, setAttributes }: PlaceBlockProps
): JSX.Element => {
    const onChange = (place: SerialisedPlace): void => { setAttributes({ ...place }); };

    const getCategory = (slug: string): PostCategory => categories.filter(
        (postCategory: PostCategory) => postCategory.slug === slug
    )[0];

    useEffect((): void => {
        const attributesToFix: Partial<SerialisedPlace> = {};

        if (!attributes.id) {
            attributesToFix.id = postId;
        }

        if (!attributes.name) {
            attributesToFix.name = postTitle;
        }

        if ((attributes as LegacyPlace).category) {
            attributesToFix.categories = [getCategory((attributes as LegacyPlace).category)];
            (attributesToFix as LegacyPlace).category = undefined;
        }

        attributesToFix.physicalShops = attributes.physicalShops.map((shop: LegacyShop): Shop => {
            if (shop.latitude) {
                shop.lat = shop.latitude;
                delete shop.latitude;
            }

            if (shop.longitude) {
                shop.lng = shop.longitude;
                delete shop.longitude;
            }

            return shop;
        })
        setAttributes(attributesToFix);
    }, []);

    return (
        <Place categories={categories} place={attributes} onChange={onChange}/>
    )
};

export const registerPlaceBlock = (): void => {
    registerBlockType<SerialisedPlace>('for-change/place', {
        title: 'For Change Place',
        icon: 'smiley',
        category: 'for-change',
        attributes: {
            name: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            logo: {
                // @ts-ignore
                type: 'object'
            },
            categories: {
                // @ts-ignore
                type: 'array',
                default: []
            },
            isVerified: {
                type: 'boolean',
                default: false
            },
            isOnline: {
                type: 'boolean',
                default: false
            },
            siteUrl: {
                type: 'string'
            },
            ecommerceUrl: {
                type: 'string'
            },
            isPhysical: {
                type: 'boolean',
                default: false
            },
            physicalShops: {
                type: 'array',
                default: []
            },
            linkedin: {
                type: 'string'
            },
            facebook: {
                type: 'string'
            },
            instagram: {
                type: 'string'
            },
            twitter: {
                type: 'string'
            },
            tripadvisor: {
                type: 'string'
            },
            youtube: {
                type: 'string'
            },
            vimeo: {
                type: 'string'
            },
            twitch: {
                type: 'string'
            }
        },
        edit: withPostTitle(
            withPostCategories(
                withPostId<PlaceBlockProps>(PlaceBlock)
            )
        ),
        save: () => null
    });
}