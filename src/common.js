import React from 'react';
import axios from 'axios';
import jsSHA from "jssha";
import moment from 'moment';
import imgEmptySites from "@/images/placeholder-sites.png";
import imgEmptyFood from "@/images/placeholder-food.png";
import imgEmptyStay from "@/images/placeholder-stay.png";
import imgEmptyEvents from "@/images/placeholder-events.png";
import icArrow from '@/images/dropdown-arrow.svg';
import { useLocation, useNavigate } from "react-router-dom";
import { PaginationList, PaginationItem } from '@/component/ui-components';
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
    geo,
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
      geo ? `$spatialFilter=nearby(${geo.latitude},${geo.longitude},10000)&` : '',
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

export const useSearch = () => {
  const { query } = useAxiosGet();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;
  const [_, currentType] = pathname.split('/');
  let params = new URLSearchParams(search);
  const city = params.get('city') || '';
  const category = params.get('c') || '';
  const urlPage = params.get('p') || 1;
  const [data, setData] = React.useState([]);
  const [counts, setCounts] = React.useState(0);
  const [pageTotal, setPageTotal] = React.useState(0);
  const [pageRound, setPageRound] = React.useState({
    current: 1,
    total: 1,
  });
  const [searchParams, setSearchParams] = React.useState({
    city,
    category,
    page: urlPage
  });

  const getData = (config) => {
    query({ type: currentType, fields: `ID,Name,City,Address,Picture${currentType === 'events' ? ',Location' : ''}`, length: 12, ...config }).then((res) => {
      if (res.length % 12 !== 0) {
        setData(res.concat(Array.from({ length: res.length % 12 }, (_, i) => ({ ID: i }))));
      } else {
        setData(res);
      }
    });
  };

  const getLength = (config) => {
    const { page, ...others } = config;
    query({ type: currentType, fields: 'ID', ...others }).then((res) => {
      setCounts(res.length);
    });
  };

  const onSearch = () => {
    getData(searchParams);
    getLength(searchParams);
    let searchString = '?';
    if (searchParams.city) {
      searchString += `city=${searchParams.city}`;
    }
    if (searchParams.category) {
      searchString += `&c=${searchParams.category}`;
    }
    setSearchParams((prev) => ({ ...prev, page: 1 }));
    navigate({ search: searchString });
  };

  React.useEffect(() => {
    getData({ city, category, page: urlPage });
    getLength({ city, category });
  }, []);

  React.useEffect(() => {
    if (counts) {
      const pageNumber = Math.ceil(counts / 12);
      setPageTotal(Math.ceil(counts / 12));
      setPageRound({ current: Math.ceil(urlPage / 5), total: Math.ceil(pageNumber / 5) });
    }
  }, [counts]);

  React.useEffect(() => {
    if (searchParams) {
      console.log('searchParams', searchParams);
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (pageRound) {
      console.log('pageRound', pageRound);
    }
  }, [pageRound]);

  const onPageChange = (target) => {
    params.delete('p');
    navigate({ search: `${params.toString()}&p=${target}` });
    setSearchParams((prev) => ({ ...prev, page: target }));
    getData({ ...searchParams, page: target });
    const heading = document.querySelector(`h1`);
    window.scrollTo({
      top: heading.offsetTop - 60,
      behavior: 'smooth'
    });
  };

  const onPrev = (target) => {
    onPageChange(target);
    if (target % 5 === 0 && pageRound.current !== 1) {
      setPageRound((prev) => ({ ...prev, current: prev.current - 1 }));
    }
  };

  const onNext = (target) => {
    onPageChange(target);
    if (target % 5 === 1 && pageRound.current < pageRound.total) {
      setPageRound((prev) => ({ ...prev, current: prev.current + 1 }));
    }
  };

  const Pagination = () => {
    const pageOffset = (pageRound.current - 1) * 5 + 1;
    const pageItemNumber = pageTotal > 5 ? (pageRound.current < pageRound.total ? 5 : (pageTotal - pageOffset + 1)) : pageTotal;
    return counts ? (
      <PaginationList>
        {parseInt(searchParams.page) !== 1 && (
          <PaginationItem onClick={() => onPrev(parseInt(searchParams.page) - 1)}>
            <img src={icArrow} style={{ transform: 'rotate(90deg)' }} />
          </PaginationItem>
        )}
        {Array.from({ length: pageItemNumber },
          (_, i) => (
            <PaginationItem
              className={searchParams.page === (i + pageOffset) ? 'active' : ''}
              key={i}
              onClick={searchParams.page === (i + pageOffset) ? () => { } : () => onPageChange(i + pageOffset)}
            >
              {i + pageOffset}
            </PaginationItem>
          )
        )}
        {parseInt(searchParams.page) !== pageTotal && (
          <PaginationItem onClick={() => onNext(parseInt(searchParams.page) + 1)}>
            <img src={icArrow} style={{ transform: 'rotate(-90deg)' }} />
          </PaginationItem>
        )}
      </PaginationList>
    ) : null;
  };

  return {
    currentType,
    data,
    counts,
    searchParams,
    setSearchParams,
    onSearch,
    Pagination
  }
};
