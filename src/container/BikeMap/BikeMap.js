import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import moment from 'moment';
import { MainCard, H4, AlignCenter, BriefText, ButtonWhite, IconText, ButtonMain, FlexBetween, Tag } from '@/component/ui-components';
import StyledSelect from '@/component/StyledSelect/StyledSelect';
import { useAxios, useIsMobileEnv } from "@/common";
import { auth, bikeCities as cities } from "@/const";
import { useLocationStore } from "@/store/locationStore";
import iconBike from "@/images/bike-available.png";
import iconBikeEmpty from "@/images/bike-empty.png";
import iconBikeOccupied from "@/images/bike-occupied.png";
import iconReload from "@/images/reload.svg";
import { MapBox, BikeInfo, BikeCounts, BikeCard, ReloadRow } from "./style";

let map;

const center = [25.0444698, 121.5170863]; //設定北車為初始點
const zoom = 16;

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

const getSitesDataByCity = (city) => {
  return useAxios({
    url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/${city}?$format=JSON&$orderby=StationUID`
  });
};

const getSitesByCity = (city) => {
  return useAxios({
    url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${city}?$format=JSON&$orderby=StationUID`
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

const generatePopup = (title, address, available, capacity, isNew) => ReactDOMServer.renderToString(
  <BikeCard>
    {isNew && <Tag>Youbike 2.0</Tag>}
    <H4 style={{ margin: '0.25em 0' }}>{title}</H4>
    <BriefText style={{ marginBottom: 16 }}>{address}</BriefText>
    <AlignCenter>
      <BikeInfo className={available > 0 ? 'availableCounts' : 'unavailableCounts'}>
        可租借
        <BikeCounts>{available}</BikeCounts>
      </BikeInfo>
      <BikeInfo className={capacity === 0 ? 'unavailableCounts' : ''}>
        可停放
        <BikeCounts>{capacity}</BikeCounts>
      </BikeInfo>
    </AlignCenter>
  </BikeCard>
);

const addMarkers = (position, targetMap, city) => {
  document.getElementById('timeContainer').innerHTML = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  Promise.all([
    city ? getSitesDataByCity(city) : getNearSites(position.lat, position.lng),
    city ? getSitesByCity(city) : getSitesData(position.lat, position.lng)
  ]).then((results) => {
    const points = results[0];
    const data = results[1];
    points.forEach((b, i) => {
      const { PositionLat, PositionLon } = b.StationPosition;
      const marker = L.marker([PositionLat, PositionLon], {
        icon: L.icon({
          iconUrl: getIcon(data[i].AvailableRentBikes, data[i].AvailableReturnBikes),
          iconAnchor: [30, 39],
          popupAnchor: [0, -39]
        })
      }).addTo(targetMap);
      marker.bindPopup(
        generatePopup(
          b.StationName.Zh_tw.split('_')[1],
          b.StationAddress.Zh_tw,
          data[i].AvailableRentBikes,
          data[i].AvailableReturnBikes,
          b.StationName.Zh_tw.split('_')[0].includes('2.0')
        )
      );
    });
  });
};

const initMap = (config, ele) => {
  const { lat, lng, isCity } = config || { lat: center[0], lng: center[1] };
  const mymap = L.map(ele).setView([lat, lng], isCity ? 13 : 16);

  const layerGroup = L.layerGroup().addTo(mymap);

  const initMarkers = (e) => {
    layerGroup.clearLayers();
    const newCenter = e.target.getCenter();
    console.log('c', newCenter);
    addMarkers(newCenter, layerGroup);
  };

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'allychen/ckw5waap41dl514o4rcpa1nsn',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: auth.mapBoxToken
  }).addTo(mymap);

  if (!isCity) {
    mymap.on('dragend', initMarkers);
    mymap.on('zoomend', initMarkers);
  }

  addMarkers({ lat, lng }, layerGroup, isCity);

  return mymap;
};

const BikeMap = () => {
  const isMobile = useIsMobileEnv();
  const ref = React.useRef(null);
  const [filter, setFilter] = React.useState(null);
  const [mapConfig, setMapConfig] = React.useState(null);
  const { locationData, setLocationData } = useLocationStore();

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition((res) => {
      setLocationData({ lat: res.coords.latitude, lng: res.coords.longitude });
    });
    setFilter(null);
  };

  const applyFilter = () => {
    if (filter && filter.city) {
      const point = cities.find((n) => n.key === filter.city).latlng;
      setMapConfig({ ...point, isCity: filter.city });
    }
  };

  const reloadMap = () => {
    setMapConfig((prev) => ({...prev, trigger: prev.trigger ? prev.trigger + 1 : 1}));
  };

  React.useEffect(() => {
    if (filter) {
      console.log('f', filter);
    }
  }, [filter]);

  React.useEffect(() => {
    map = initMap(mapConfig, ref.current);
    return () => {
      map.remove();
    }
  }, [mapConfig]);

  React.useEffect(() => {
    if (locationData) {
      setMapConfig(locationData);
    }
  }, [locationData]);

  return (
    <MainCard style={{marginTop: 30}}>
      <FlexBetween style={{ marginBottom: 12, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
        <FlexBetween style={isMobile ? { flexBasis: '100%', marginBottom: 8 } : null}>
          <StyledSelect
            style={isMobile ? { flex: 1, marginRight: 8 } : null}
            defaultValue={filter ? filter.city : ''}
            onSelect={(val) => setFilter((prev) => ({ ...prev, city: val }))}
            options={[{ value: '', label: '縣市', disabled: true }].concat(cities.map((n) => ({ value: n.key, label: n.name })))}
          />
          {isMobile && <ButtonMain onClick={applyFilter} style={{minWidth: 'auto'}}>篩選</ButtonMain>}
        </FlexBetween>
        <FlexBetween>
          {!isMobile && <ButtonMain onClick={applyFilter} style={{ marginRight: 8 }}>篩選</ButtonMain>}
          <ButtonWhite onClick={getPosition}>我的附近</ButtonWhite>
        </FlexBetween>
      </FlexBetween>
      <ReloadRow>
        <IconText onClick={reloadMap}>
          <img src={iconReload} />
          <div id="timeContainer" />
        </IconText>
      </ReloadRow>
      <MapBox ref={ref} />
    </MainCard>
  );
};

export default BikeMap;
