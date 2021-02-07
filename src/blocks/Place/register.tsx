import { registerBlockType, BlockEditProps } from '@wordpress/blocks';
import React from 'react';

import { attributes } from './attributes';
import { Place, SerialisedPlace } from './Place';

type PlaceBlockProps = BlockEditProps<SerialisedPlace>;

const PlaceBlock: React.FunctionComponent<PlaceBlockProps> = (
    { attributes, setAttributes }: PlaceBlockProps
): JSX.Element => {
    const onChange = (place: SerialisedPlace): void => { setAttributes({ ...place }); };

    return (
        <Place place={attributes} onChange={onChange}/>
    );
};

export const registerPlaceBlock = (): void => {
    registerBlockType<SerialisedPlace>('for-change/place', {
        title: 'For Change Place',
        icon: 'smiley',
        category: 'for-change',
        attributes,
        edit: (props) => (
            <PlaceBlock {...props}/>
        ),
        save: () => null
    });
}