import { registerBlockType } from '@wordpress/blocks';
import { Button, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { MediaUpload, RichText } from '@wordpress/editor';

import { PhysicalShopsEdit } from './PhysicalShop';
import { PlaceCategories } from './PlaceCategories';

const withPostTitle = withSelect(select => ({
    postTitle: typeof select("core/editor").getPostEdits().title !== 'undefined' ?
        select("core/editor").getPostEdits().title :
        select("core/editor").getCurrentPost().title
}));

registerBlockType('for-change/place', {
    title: 'For Change Place',
    icon: 'smiley',
    category: 'for-change',
    attributes: {
        name: {
            type: 'string'
        },
        description: {
            source: 'html',
            selector: '.for-change-description'
        },
        logo: {
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
    edit: withPostTitle(({ attributes, postTitle, setAttributes }) => {
        if (!attributes.name) {
            setAttributes({ name: postTitle });
        }

        return (
            <React.Fragment>
                <h3>Place</h3>
                <h5>Place name:</h5>
                <TextControl
                    value={attributes.name}
                    onChange={name => { setAttributes({ name }); }}
                />
                <h5>Place logo:</h5>
                <MediaUpload
                    onSelect={logo => { setAttributes({ logo }); }}
                    render={({ open }) => {
                        console.log(attributes.logo);
                        return attributes.logo ? (
                            <img 
                                src={attributes.logo.sizes.thumbnail.url}
                                onClick={open}
                            />
                        ) : (
                            <Button isPrimary={true} onClick={open}>Select media</Button>
                        );
                    }}
                />
                <h5>Place description:</h5>
                <RichText 
                    className="for-change-description"
                    tagName="div"
                    placeholder="Enter your description here"
                    value={attributes.description}
                    onChange={description => { setAttributes({ description }); }}
                />
                <h5>Category:</h5>
                <SelectControl
                    value={attributes.category}
                    onChange={category => { setAttributes({ category }); }}
                    options={[{
                        value: null,
                        label: 'Select category'
                    }].concat(Object.keys(PlaceCategories).map(placeCategory => ({
                        value: PlaceCategories[placeCategory],
                        label: PlaceCategories[placeCategory]
                    })))}
                />
                <h5>Is verified:</h5>
                <ToggleControl
                    checked={attributes.isVerified}
                    onChange={isVerified => { setAttributes({ isVerified }) }}
                />
                <h5>Is online:</h5>
                <ToggleControl
                    checked={attributes.isOnline}
                    onChange={isOnline => { setAttributes({ isOnline }) }}
                />
                {attributes.isOnline ? (
                    <React.Fragment>
                        <h5>Site url</h5>
                        <TextControl
                            value={attributes.siteUrl}
                            onChange={siteUrl => { setAttributes({ siteUrl }); }}
                        />
                        <h5>Ecommerce url</h5>
                        <TextControl
                            value={attributes.ecommerceUrl}
                            onChange={ecommerceUrl => { setAttributes({ ecommerceUrl }); }}
                        />
                    </React.Fragment>
                ): null}
                <h5>Is physical:</h5>
                <ToggleControl
                    checked={attributes.isPhysical}
                    onChange={isPhysical => { setAttributes({ isPhysical }); }}
                />
                {attributes.isPhysical ? (
                    <React.Fragment>
                        <h4>Shops</h4>
                        <PhysicalShopsEdit
                            placeName={attributes.name}
                            shops={attributes.physicalShops}
                            onChange={physicalShops => { setAttributes({ physicalShops }); }}
                        />
                    </React.Fragment>
                ): null}
                <h4>Social Networks</h4>
                <h5>LinkedIn:</h5>
                <TextControl
                    value={attributes.linkedin}
                    onChange={linkedin => { setAttributes({ linkedin }); }}
                />
                <h5>Facebook:</h5>
                <TextControl
                    value={attributes.facebook}
                    onChange={facebook => { setAttributes({ facebook }); }}
                />
                <h5>Instagram:</h5>
                <TextControl
                    value={attributes.instagram}
                    onChange={instagram => { setAttributes({ instagram }); }}
                />
                <h5>Twitter:</h5>
                <TextControl
                    value={attributes.twitter}
                    onChange={twitter => { setAttributes({ twitter }); }}
                />
                <h5>Tripadvisor:</h5>
                <TextControl
                    value={attributes.tripadvisor}
                    onChange={tripadvisor => { setAttributes({ tripadvisor }); }}
                />
                <h5>Vimeo:</h5>
                <TextControl
                    value={attributes.vimeo}
                    onChange={vimeo => { setAttributes({ vimeo }); }}
                />
                <h5>Youtube:</h5>
                <TextControl
                    value={attributes.youtube}
                    onChange={youtube => { setAttributes({ youtube }); }}
                />
                <h5>Twitch:</h5>
                <TextControl
                    value={attributes.twitch}
                    onChange={twitch => { setAttributes({ twitch }); }}
                />
            </React.Fragment>
        );
    }),
    save: () => null
});