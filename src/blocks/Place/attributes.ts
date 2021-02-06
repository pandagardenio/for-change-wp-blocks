import { Block } from "@wordpress/blocks";

import { SerialisedPlace } from "./Place";

export type Attributes = Block<SerialisedPlace>['attributes'];
export const attributes: Attributes = {
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
};