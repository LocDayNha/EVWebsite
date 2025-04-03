import React, { useState, useEffect,useCallback } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const Test = () => {
    const containerStyle = {
        width: '400px',
        height: '400px',
    }

    const center = {
        lat: 8.695356035575193,
        lng: 106.59880700460278,
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyADJCV_7LiFmdeMd9TLZe_pLKn8qTDlank',
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
        </GoogleMap>
    );
};

export default Test;
