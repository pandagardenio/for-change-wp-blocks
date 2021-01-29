import { Button, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { MediaUpload, RichText } from '@wordpress/editor';
import React from 'react';

import { PlaceCategories } from './PlaceCategories';
import { PhysicalShops } from './PhysicalShops';
import { Shop } from './PhysicalShop';
import { PostCategory } from '../../hoc';

export type SerialisedPlace = {
    categories: PostCategory[];
    description: string;
    ecommerceUrl: string;
    facebook: string;
    id: number;
    instagram: string;
    isOnline: boolean;
    isPhysical: boolean;
    isVerified: boolean;
    linkedin: string;
    logo: Record<string, any>;
    name: string;
    physicalShops: Shop[];
    siteUrl: string;
    tripadvisor: string;
    twitch: string;
    twitter: string;
    vimeo: string;
    youtube: string;
}

export type PlaceProps = {
    onChange: (placePartial: Partial<SerialisedPlace>) => void;
    place: SerialisedPlace;
    categories: PostCategory[];
};

export const Place: React.FunctionComponent<PlaceProps> = (
    { categories, onChange, place }: PlaceProps
): JSX.Element => (
    <>
        <h3>Place</h3>
        <h5>Place name:</h5>
        <TextControl
            value={place.name}
            onChange={(name: string) => { onChange({ name }); }}
        />
        <h5>Place logo:</h5>
        <MediaUpload
            onSelect={(logo: Record<string, any>) => { onChange({ logo }); }}
            render={({ open }) => {
                return place.logo ? (
                    <img 
                        src={place.logo.sizes.thumbnail.url}
                        onClick={open}
                    />
                ) : (
                    <Button isPrimary={true} onClick={open}>Select media</Button>
                );
            }}
        />
        <h5>Place description:</h5>
        <RichText
            inlineToolbar={true}
            placeholder="Enter your description here"
            value={place.description}
            onChange={(description: string) => { onChange({ description }); }}
            style={{
                backgroundColor: '#fff',
                border: '1px solid rgb(117, 117, 117)',
                borderRadius: '2px',
                boxShadow: '0 0 0 .5px var(--wp-admin-theme-color)',
                padding: '6px 8px'
            }}
        />
        <h5>Categories:</h5>
        <PlaceCategories
            categories={categories}
            selectedCategories={place.categories}
            onChange={(selectedCategories: PostCategory[]) => { onChange({ categories: selectedCategories }); }}
        />
        <h5>Is verified:</h5>
        <ToggleControl
            checked={place.isVerified}
            onChange={(isVerified: boolean) => { onChange({ isVerified }) }}
        />
        <h5>Is online:</h5>
        <ToggleControl
            checked={place.isOnline}
            onChange={(isOnline: boolean) => { onChange({ isOnline }) }}
        />
        {place.isOnline ? (
            <>
                <h5>Site url</h5>
                <TextControl
                    value={place.siteUrl}
                    onChange={(siteUrl: string) => { onChange({ siteUrl }); }}
                />
                <h5>Ecommerce url</h5>
                <TextControl
                    value={place.ecommerceUrl}
                    onChange={(ecommerceUrl: string) => { onChange({ ecommerceUrl }); }}
                />
            </>
        ): null}
        <h5>Is physical:</h5>
        <ToggleControl
            checked={place.isPhysical}
            onChange={(isPhysical: boolean) => { onChange({ isPhysical }); }}
        />
        {place.isPhysical ? (
            <>
                <h4>Shops</h4>
                <PhysicalShops
                    placeName={place.name}
                    shops={place.physicalShops}
                    onChange={(physicalShops: Shop[]) => { onChange({ physicalShops }); }}
                />
            </>
        ): null}
        <h4>Social Networks</h4>
        <h5>LinkedIn:</h5>
        <TextControl
            value={place.linkedin}
            onChange={(linkedin: string) => { onChange({ linkedin }); }}
        />
        <h5>Facebook:</h5>
        <TextControl
            value={place.facebook}
            onChange={(facebook: string) => { onChange({ facebook }); }}
        />
        <h5>Instagram:</h5>
        <TextControl
            value={place.instagram}
            onChange={(instagram: string) => { onChange({ instagram }); }}
        />
        <h5>Twitter:</h5>
        <TextControl
            value={place.twitter}
            onChange={(twitter: string) => { onChange({ twitter }); }}
        />
        <h5>Tripadvisor:</h5>
        <TextControl
            value={place.tripadvisor}
            onChange={(tripadvisor: string) => { onChange({ tripadvisor }); }}
        />
        <h5>Vimeo:</h5>
        <TextControl
            value={place.vimeo}
            onChange={(vimeo: string) => { onChange({ vimeo }); }}
        />
        <h5>Youtube:</h5>
        <TextControl
            value={place.youtube}
            onChange={(youtube: string) => { onChange({ youtube }); }}
        />
        <h5>Twitch:</h5>
        <TextControl
            value={place.twitch}
            onChange={(twitch: string) => { onChange({ twitch }); }}
        />
    </>
);