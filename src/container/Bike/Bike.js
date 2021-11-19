import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { ContentWrapper, AlignCenter, H1, ButtonWhite } from '@/component/ui-components';
import { Outlet } from 'react-router';

const Map = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState('');
  const { center = '' } = map;
  const { lat, lng } = center;

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <div ref={ref} style={style}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </div>
  );
};

const BikeMarker = (options) => {
  const [marker, setMarker] = React.useState(null);

  const infowindow = new google.maps.InfoWindow({
    content: options.title
  });

  const showInfo = () => {
    console.log('win', infowindow);
    if (options.lastInfo) {
      options.lastInfo.close();
    }
    if (options.bindInfo && !options.lastInfo) {
      options.bindInfo(infowindow);
    }
    infowindow.open({
      anchor: marker,
      map: options.map,
      shouldFocus: true,
    });
  };

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    } else {
      marker.addListener("click", showInfo);
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const Bike = () => {
  const [clicks, setClicks] = React.useState([]);
  const [target, setTarget] = React.useState(null);
  const [bikeData, setBikeData] = React.useState([{
    latitude: 23.465,
    longitude: 121.265,
  }]);
  const [zoom, setZoom] = React.useState(8); // initial zoom
  const [center, setCenter] = React.useState({
    lat: 23.465,
    lng: 121.265,
  });

  const { lat, lng } = center;

  const onClick = (e = '') => {
    console.log("click", e);
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m = '') => {
    // console.log("onIdle", m);
    setZoom(m.getZoom ? m.getZoom() : 8);
    setCenter(m.getCenter ? m.getCenter().toJSON() : {
      lat: 23.465,
      lng: 121.265,
    });
  };
  React.useEffect(() => {
    console.log('lat', lat);
  }, [lat, lng]);
  React.useEffect(() => {
    console.log('target', target);
  }, [target]);
  return (
    <Map center={center} zoom={zoom} style={{ width: 1000, height: 600 }} onClick={onClick} onIdle={onIdle}>
      <BikeMarker position={center} title={'111'} bindInfo={setTarget} lastInfo={target} />
      <BikeMarker position={{ lat: 23.467, lng: 121.23 }} title={'222'} bindInfo={setTarget} lastInfo={target} />
      {/* {clicks.length > 0 ? clicks.map((b, i) => <BikeMarker key={i} position={b} title={String(b.lat())} />) : null} */}
    </Map>
  );
};

const BikeTop = () => {
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <AlignCenter style={{ marginBottom: 30 }}>
        <H1>騎鐵馬</H1>
        <ButtonWhite onClick={() => navigate('search')}>站點查詢</ButtonWhite>
      </AlignCenter>
      <Outlet />
    </ContentWrapper>
  );
};

export default BikeTop;
