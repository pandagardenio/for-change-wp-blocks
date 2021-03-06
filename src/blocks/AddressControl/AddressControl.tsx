import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

export type AddressControlProps = {
    onChange: (address: string) => void;
    onSelect: (latLng: { lat: number; lng: number}) => void;
    value: string;
}

export const AddressControl: React.FunctionComponent<AddressControlProps> = (
    { onChange, value, onSelect }: AddressControlProps
): JSX.Element => {
    const [address, setAddress] = useState<string>(value);
     
    const handleChange = (address: string): void => {
        setAddress(address);
        onChange && onChange(address);
    };
     
    const handleSelect = (address: string): void => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => onSelect(latLng))
            .catch(error => console.error('Error', error));
    };

    return (
        <PlacesAutocomplete
            debounce={600}
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                            style: {
                                width: '100%'
                            }
                        }) as any}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

(() => {
    const script = document.createElement('script');
    script.setAttribute(
        'src',
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAmvnfwMQPdUgcWAV8gcx1qZTudEdayt3s&libraries=places'
    );
    document.head.appendChild(script);
})();
