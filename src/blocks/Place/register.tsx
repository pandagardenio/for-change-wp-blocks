import { registerBlockType, BlockEditProps } from '@wordpress/blocks';
import React, { useEffect } from 'react';

import { attributes } from './attributes';
import { Place, SerialisedPlace } from './Place';
import { useTitle, useId } from '../../hooks';

type PlaceBlockProps = BlockEditProps<SerialisedPlace>;

const PlaceBlock: React.FunctionComponent<PlaceBlockProps> = (
    { attributes, setAttributes }: PlaceBlockProps
): JSX.Element => {
    const onChange = (place: SerialisedPlace): void => { setAttributes({ ...place }); };
    const title = useTitle();
    const id = useId();

    useEffect((): void => {
        const attributesToFix: Partial<SerialisedPlace> = {};

        if (!attributes.id) {
            attributesToFix.id = id;
        }

        if (!attributes.name) {
            attributesToFix.name = title;
        }
        setAttributes(attributesToFix);
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
        attributes,
        edit: (props) => (
            <PlaceBlock {...props}/>
        ),
        save: () => null
    });
}