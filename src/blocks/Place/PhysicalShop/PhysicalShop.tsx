import { TextControl } from '@wordpress/components';
import React from 'react';

import { AddressControl } from '../../AddressControl';

export type Shop = {
    address: string;
    name: string;
    lat: number;
    lng: number;
};

export type PhysicalShopProps = {
    onChangeShop: (shop: Shop) => void;
    shop: Shop;
}

export const PhysicalShop: React.FunctionComponent<PhysicalShopProps> = (
    { shop, onChangeShop }: PhysicalShopProps
) => {
    return (
        <div style={{ borderBottom: '3px solid black', marginBottom: '16px', paddingBottom: '16px' }}>
            <h5>Shop name</h5>
            <TextControl
                value={shop.name}
                onChange={name => { onChangeShop({ ...shop, name }); }}
            />
            <h5>Address</h5>
            <AddressControl
                onChange={address => {
                    onChangeShop({ ...shop, address });
                }}
                onSelect={latLng => {
                    onChangeShop({ ... shop, lat: latLng.lat, lng: latLng.lng})
                }}
                value={shop.address}
            />
            <h5>Latitude</h5>
            <TextControl
                type="number"
                value={shop.lat}
                onChange={(lat: string) => { onChangeShop({ ...shop, lat: parseFloat(lat) }); }}
            />
            <h5>Longitude</h5>
            <TextControl
                type="number"
                value={shop.lng}
                onChange={(lng: string) => { onChangeShop({ ...shop, lng: parseFloat(lng) }); }}
            />
        </div>
    );
};
