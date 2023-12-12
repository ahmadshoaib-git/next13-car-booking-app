'use client';
// import React from 'react';
// import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

// const Booking = () => {
//     const { isLoaded } = useLoadScript({
//         googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
//     });
//     const center = React.useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
//     return <div>{!isLoaded ? <h1>Loading...</h1> : <GoogleMap mapContainerClassName="map-container" center={center} zoom={10} />}</div>;
// };

// export default Booking;

// import React from 'react';
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// const containerStyle = {
//     width: '100%',
//     height: '100%',
// };

// const center = {
//     lat: -3.745,
//     lng: -38.523,
// };

// const Map = () => {
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
//     });

//     const [map, setMap] = React.useState(null);

//     const onLoad = React.useCallback(function callback(map: any) {
//         // This is just an example of getting and using the map instance!!! don't just blindly copy!
//         const bounds = new window.google.maps.LatLngBounds(center);
//         map.fitBounds(bounds);

//         setMap(map);
//     }, []);

//     const onUnmount = React.useCallback(function callback(map: any) {
//         setMap(null);
//     }, []);

//     return isLoaded ? (
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
//             {/* Child components, such as markers, info windows, etc. */}
//             <></>
//         </GoogleMap>
//     ) : (
//         <></>
//     );
// };

// export default React.memo(Map);

import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: any) => (
    <div
        style={{
            color: 'white',
            background: 'grey',
            padding: '15px 10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)',
        }}
    >
        {text}
    </div>
);

const SimpleMap = () => {
    const dataProps = {
        center: { lat: 59.95, lng: 30.33 },
        zoom: 11,
    };

    return (
        <GoogleMapReact defaultCenter={dataProps.center} defaultZoom={dataProps.zoom}>
            <AnyReactComponent lat={59.955413} lng={30.337844} text={'Kreyser Avrora'} />
        </GoogleMapReact>
    );
};

export default SimpleMap;

