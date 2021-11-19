import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { H3, BriefText, IconText, Tag } from '@/component/ui-components';
import { renderImg } from '@/common';
import { auth, colors } from "@/const";
import iconMapMark from '@/images/Marker.svg';
import { CardWrapper, LinkText, FigureContainer, MiniMap } from './style';

const Card = ({ data, type, nearby, geometry }) => {
  const ref = React.useRef();
  const { title, location, link, figure, length } = data;
  const navigate = useNavigate();
  const onCardClick = () => {
    if (type === 'lane') {
      // navigate(`${link}`);
      return null;
    }
    navigate(`/${type}${link}`, { state: nearby || null });
  };

  const initMap = () => {
    const newLatlng = L.GeoJSON.coordsToLatLngs(geometry.coordinates[0]);
    const l = L.polyline(newLatlng, {color: colors.main});
    const bounds = l.getBounds();
    const center = bounds.getCenter();
    const mymap = L.map(ref.current, {zoomControl: false}).setView([center.lat, center.lng], 15);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'allychen/ckw5waap41dl514o4rcpa1nsn',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: auth.mapBoxToken
    }).addTo(mymap);
    l.addTo(mymap);
    mymap.fitBounds(bounds);
    return mymap;
  };
  React.useEffect(() => {
    if (type === 'lane') {
      const map = initMap();
      return () => {
        map.remove();
      }
    }
  }, []);
  return (
    <CardWrapper onClick={onCardClick} title={title}>
      {type === 'lane' ? (
        <MiniMap ref={ref} onClick={(e) => e.stopPropagation()} />
      ) : <FigureContainer style={{ backgroundImage: renderImg(type, figure) }} />}
      <H3>{title}</H3>
      <IconText>
        <img src={iconMapMark} />
        <BriefText>{location}</BriefText>
        {length && <Tag>{Math.floor(length*100)/100}km</Tag>}
      </IconText>
      <LinkText>了解更多</LinkText>
    </CardWrapper>
  );
};

export default Card;

Card.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    duration: PropTypes.string,
    figure: PropTypes.string
  }).isRequired,
  type: PropTypes.string.isRequired,
  nearby: PropTypes.object,
  geometry: PropTypes.object
};

Card.defaultProps = {
  data: {
    duration: '',
    figure: '',
  },
  nearby: null,
  geometry: null
};
