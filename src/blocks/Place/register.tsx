import { registerBlockType, BlockEditProps } from '@wordpress/blocks';
import React, { useEffect } from 'react';

import { Place, SerialisedPlace } from './Place';
import { withPostId, withPostTitle } from '../../hoc';
import { Shop } from './PhysicalShop';

type PlaceBlockProps = BlockEditProps<SerialisedPlace> & {
    postId: number;
    postTitle: string;
};

type LegacyShop = Shop & {
    latitude: number;
    longitude: number;
};

const PlaceBlock: React.FunctionComponent<PlaceBlockProps> = (
    { attributes, postId, postTitle, setAttributes }: PlaceBlockProps
): JSX.Element => {
    if (!attributes.id) {
        setAttributes({ id: postId });
    }

    if (!attributes.name) {
        setAttributes({ name: postTitle });
    }

    const onChange = (place: SerialisedPlace): void => { setAttributes({ ...place }); };

    useEffect((): void => {
        setAttributes({
            physicalShops: attributes.physicalShops.map((shop: LegacyShop): Shop => {
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
        });
    }, []);

    return (
        <Place place={attributes} onChange={onChange}/>
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
            category: {
                type: 'string'
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
            withPostId<PlaceBlockProps>(PlaceBlock)
        ),
        save: () => null
    });
}