import { Block } from "@wordpress/blocks";
import { select } from "@wordpress/data";

import { SerialisedPlace } from "./Place";

export type Attributes = Block<SerialisedPlace>['attributes'];

export const getTitle = () => select("core/editor").getPostEdits().title !== 'undefined' ?
    select("core/editor").getPostEdits().title :
    select("core/editor").getCurrentPost().title;

export const getId = () => select("core/editor").getCurrentPostId();

export const attributes: Attributes = {
    id: {
        type: 'number',
        default: getId()
    },
    name: {
        type: 'string',
        default: getTitle()
    },
    description: {
        type: 'string'
    },
    logo: {
        // @ts-ignore
        type: 'object'
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