import React from 'react';
import axios from 'axios';
import jsSHA from "jssha";
import moment from 'moment';
import imgEmptySites from "@/images/placeholder-sites.png";
import imgEmptyFood from "@/images/placeholder-food.png";
import imgEmptyStay from "@/images/placeholder-stay.png";
import imgEmptyEvents from "@/images/placeholder-events.png";
import { useLocation } from "react-router-dom";
import { TripleColsWrapper, FourColsWrapper } from '@/component/ui-components';
import Card from "@/component/Card/Card";
import { apiRoot, auth, alias } from "@/const";

const imgPlaceholder = {
  sites: imgEmptySites,
  events: imgEmptyEvents,
  food: imgEmptyFood,
  stay: imgEmptyStay,
};

const checkIsMobile = () => {
  if (typeof window === 'undefined') {
    return true;
  }
  return window.innerWidth < 1024;
};

export const useIsMobile = () => {
  // Initialize the desktop size to an accurate value on initial state set
  const [isMobileSize, setIsMobileSize] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const autoResize = () => {
      setIsMobileSize(checkIsMobile());
    }

    window.addEventListener('resize', autoResize);

    autoResize();

    // Return a function to disconnect the event listener
    return () => window.removeEventListener('resize', autoResize);
  }, [])

  return isMobileSize;
};

export const useIsMobileEnv = () => {
  const [isMobileEnv, setIsMobileEnv] = React.useState(false);

  React.useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobileEnv(true);
    }
  }, [])

  return isMobileEnv;
};

export const renderImg = (type, figure) => {
  return `url(${figure || imgPlaceholder[type]})`;
};

const genHMAC = () => {
  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(auth.key, 'TEXT');
  ShaObj.update(`x-date: ${GMTString}`);
  const HMAC = ShaObj.getHMAC('B64');
  return { HMAC, GMTString };
};

export const useAxiosGet = () => {
  const location = useLocation();
  const { search } = location;
  let params = new URLSearchParams(search);
  const urlFilter = params.get('$filter');
  const { HMAC, GMTString } = genHMAC();

  const query = async ({
    type,
    length,
    page,
    city,
    id,
    category,
    fields,
    nearby,
  }) => {
    params.delete('p');
    params.delete('c');
    params.delete('city');
    const searchStr = params.toString();
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * 12;
    } else {
      offset = 0;
    }
    let others = searchStr ? searchStr.substr(1, searchStr.length).replace('24filter', '$filter') : '';
    others = others.replace('24spatialFilter', '$spatialFilter');
    console.log('others', others);
    let responseData = null;
    let classFilterString = category ? `Class eq '${category}'` : '';
    if (type === 'events') {
      classFilterString = category ? `Class1 eq '${category}' or Class2 eq '${category}'` : '';
    }
    if (type === 'sites') {
      classFilterString = category ? `Class1 eq '${category}' or Class2 eq '${category}' or Class3 eq '${category}'` : '';
    }
    if (urlFilter && classFilterString) {
      const otherFilter = others.slice(others.indexOf('$filter=') + '$filter='.length);
      params.delete('$filter');
      others = params.toString();
      classFilterString += `and ${otherFilter}`;
    }

    const filters = [
      id ? `ID eq '${id}'` : '',
      // city ? `City eq '${city}' or contains(Address,'${city}')` : '',
      // city && classFilterString ? ' and ' : '',
      classFilterString,
    ].join('');

    const url = [
      apiRoot,
      alias[type] || 'ScenicSpot',
      city ? `/${city}` : '',
      '?',
      fields ? `$select=${fields}&` : '',
      length ? `$top=${length}&` : '',
      offset ? `$skip=${offset}&` : '',
      nearby ? `$spatialFilter=nearby(${nearby.latitude},${nearby.longitude},10000)&` : '',
      filters ? `$filter=${filters}&` : '',
      others ? `${others}&` : '',
      '$format=JSON'
    ].join('');
    try {
      const { data } = await axios({
        method: 'get',
        url,
        responseType: 'json',
        headers: {
          Authorization: `hmac username="${auth.id}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`,
          'x-date': GMTString,
        }
      });
      responseData = data;
    } catch (err) {
      console.log('api error: ', err);
    }

    return responseData
  };
  return {
    query
  };
};

export const formatDate = (timeString) => {
  return moment(timeString).format('YYYY-MM-DD');
};

export const renderGrids = (listData, type, nearby) => {
  if (type === 'food') {
    return (
      <FourColsWrapper>
        {listData.map((one) => one.Name ? (
          <Card
            key={one.ID}
            data={{
              title: one.Name,
              location: one.City || (one.Address ? one.Address.substr(0, 3) : ''),
              link: `/${one.ID}`, figure: one.Picture.PictureUrl1 || '',
              nearby
            }}
            type="food" />
        ) : <div key={one.ID}> </div>)}
      </FourColsWrapper>
    );
  }
  return (
    <TripleColsWrapper>
      {listData.map((one) => one.Name ? (
        <Card
          key={one.ID}
          data={{
            title: one.Name,
            location: one.City || one.Location ||  (one.Address ? one.Address.substr(0, 3) : ''),
            link: `/${one.ID}`, figure: one.Picture.PictureUrl1 || '',
            nearby
          }}
          type={type} />
      ) : <div key={one.ID}> </div>)}
    </TripleColsWrapper>
  );
};
