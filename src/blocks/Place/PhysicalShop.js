import { Button, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

import { AddressControl } from '../AddressControl';

const getEmptyShop = () => {
    return {
        address: undefined,
        name: undefined,
        latitude: undefined,
        longitude: undefined
    };
};

const PhysicalShopEdit = ({ shop, onChangeShop }) => {
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
                    onChangeShop({ ... shop, latitude: latLng.lat, longitude: latLng.lng})
                }}
                value={shop.address}
            />
            <h5>Latitude</h5>
            <TextControl
                type="number"
                value={shop.latitude}
                onChange={latitude => { onChangeShop({ ...shop, latitude }); }}
            />
            <h5>Longitude</h5>
            <TextControl
                type="number"
                value={shop.longitude}
                onChange={longitude => { onChangeShop({ ...shop, longitude }); }}
            />
        </div>
    );
};

export const PhysicalShopsEdit = props => {
    const [shops, setShops] = useState(props.shops.length ? props.shops : [getEmptyShop()]);

    const addShop = () => {
        setShops([...shops, getEmptyShop()]);
    };

    const handleShopChange = (index) => {
        return shop => {
            const newShops = [...shops.slice(0,index), shop, ...shops.slice(index + 1)];
            props.onChange(newShops);
            setShops(newShops);
        };
    };

    const getShop = shop => ({
        ...shop,
        name: shop.name || props.placeName,
    });

    return (
        <React.Fragment>
            {shops.map((shop, index) => <PhysicalShopEdit shop={getShop(shop)} onChangeShop={handleShopChange(index)}/>)}
            <Button isPrimary={true} onClick={addShop}>Add another shop</Button>
        </React.Fragment>
    )
};