import { Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import React from 'react';

import { PhysicalShop } from '../PhysicalShop';
import { Shop } from '../PhysicalShop';

const getEmptyShop = (): Shop => {
    return {
        address: '',
        name: '',
        lat: 0,
        lng: 0
    };
};

export type PhysicalShopsProps = {
    onChange: (shops: Shop[]) => void;
    placeName: string;
    shops: Shop[];
};

export const PhysicalShops: React.FunctionComponent<PhysicalShopsProps> = (
    props: PhysicalShopsProps
): JSX.Element => {
    const [shops, setShops] = useState(props.shops.length ? props.shops : [getEmptyShop()]);

    const addShop = () => {
        setShops([...shops, getEmptyShop()]);
    };

    const handleShopChange = (index: number) => {
        return (shop: Shop) => {
            const newShops = [...shops.slice(0,index), shop, ...shops.slice(index + 1)];
            props.onChange(newShops);
            setShops(newShops);
        };
    };

    const getShop = (shop: Shop) => ({
        ...shop,
        name: shop.name || props.placeName,
    });

    return (
        <>
            {shops.map((shop, index) => <PhysicalShop shop={getShop(shop)} onChangeShop={handleShopChange(index)}/>)}
            <Button isPrimary={true} onClick={addShop}>Add another shop</Button>
        </>
    )
};