import React from 'react';
import L from 'leaflet';
import { ContentWrapper, PageTop, AlignCenter, H1 } from '@/component/ui-components';
import { Wrapper } from "@googlemaps/react-wrapper";
import { useAxios } from "@/common";
import { auth } from "@/const";
import iconBike from "@/images/bike-available.png";
import iconBikeEmpty from "@/images/bike-empty.png";
import iconBikeOccupied from "@/images/bike-occupied.png";
import { MapBox } from "./style";

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

const Bike2 = () => {
  const ref = React.useRef(null);
  const TPstation = [25.0444698, 121.5170863]; //設定北車為初始點
  const [center, setCenter] = React.useState(TPstation);
  const [zoom, setZoom] = React.useState(16);

  const getSitesData = (lat, lng) => {
    return useAxios({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${lat},${lng},1000)&$format=JSON&$orderby=StationUID`
    });
  };

  const getNearSites = (lat, lng) => {
    return useAxios({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(${lat},${lng},1000)&$format=JSON&$orderby=StationUID`
    });
  };

  const getIcon = (available, capacity) => {
    if (capacity === 0) {
      return iconBikeOccupied;
    }
    if (available === 0) {
      return iconBikeEmpty;
    }
    return iconBike;
  };

  React.useEffect(() => {
    const mymap = L.map(ref.current).setView([center[0], center[1]], zoom)
      .on('moveend', (e) => {
        const newCenter = e.target.getCenter();
        setCenter([newCenter.lat, newCenter.lng]);
      })
      .on('zoomend', (e) => {
        const newZoom = e.target.getZoom();
        setZoom(newZoom);
      });

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: auth.mapBoxToken
    }).addTo(mymap);

    const currentCenter = mymap.getCenter();

    Promise.all([
      getNearSites(currentCenter.lat, currentCenter.lng),
      getSitesData(currentCenter.lat, currentCenter.lng)
    ]).then((results) => {
      const points = results[0];
      const data = results[1];
      points.forEach((b, i) => {
        const { PositionLat, PositionLon } = b.StationPosition;
        const marker = L.marker([PositionLat, PositionLon], {
            icon: L.icon({ iconUrl: getIcon(data[i].AvailableRentBikes, data[i].AvailableReturnBikes),
            iconAnchor: [30, 39],
            popupAnchor: [0, -39]
          }) }).addTo(mymap);
        marker.bindPopup(`<div>Available:${data[i].AvailableRentBikes}<br/>Capacity:${data[i].AvailableReturnBikes}</div>`)
      });
    });

    return () => {
      mymap.remove();
    }
  }, [center]);

  return (
    <ContentWrapper>
      <AlignCenter>
        <H1>騎鐵馬</H1>
      </AlignCenter>
      <MapBox ref={ref} />
    </ContentWrapper>
  );
};

export default Bike2;
