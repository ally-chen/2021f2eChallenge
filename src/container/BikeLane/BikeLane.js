import React from 'react';
import parse from 'wellknown';
import { useLocation, useNavigate } from "react-router-dom";
import { PageTop, SearchBoard, FlexBetween, ButtonMain, PaginationList, PaginationItem, ContentWrapper, TwoColsWrapper } from "@/component/ui-components";
import { useIsMobileEnv, useAxiosGet, renderGrids, useAxios } from "@/common";
import icArrow from '@/images/dropdown-arrow.svg';
import StyledSelect from "@/component/StyledSelect/StyledSelect";
import Card from "@/component/Card/Card";
import { cities } from "@/const";


const query = ({length, page, city, fields}) => {
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * 10;
  } else {
    offset = 0;
  }
  const url = [
    'https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/',
    city,
    '?',
    fields ? `$select=${fields}&` : '',
    length ? `$top=${length}&` : '',
    offset ? `$skip=${offset}&` : '',
    '$format=JSON'
  ].join('');
  return useAxios({ url });
};

const BikeLane = () => {
  const location = useLocation();
  const isMobile = useIsMobileEnv();
  const { pathname, search } = location;
  const navigate = useNavigate();
  let params = new URLSearchParams(search);
  const urlPage = params.get('p') || 1;
  const [data, setData] = React.useState([]);
  const [counts, setCounts] = React.useState(0);
  const [pageTotal, setPageTotal] = React.useState(0);
  const [pageRound, setPageRound] = React.useState({
    current: 1,
    total: 1,
  });
  const [searchParams, setSearchParams] = React.useState({
    city: 'Taipei',
    page: urlPage
  });

  const getData = ({page, city}) => {
    query({ length: 10, page, city }).then((res) => {
      setData(res.map((n) => ({...n, geometry: parse(n.Geometry)})));
    });
  };

  const getLength = ({city}) => {
    query({ fields: 'RouteName', city }).then((res) => {
      setCounts(res.length);
    });
  };

  const onSearch = () => {
    getData(searchParams);
    getLength(searchParams);
    setSearchParams((prev) => ({ ...prev, page: 1 }));
    params.delete('p');
    navigate({pathname, search: params.toString()});
  };

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

  React.useEffect(() => {
    if (counts) {
      const pageNumber = Math.ceil(counts / 12);
      setPageTotal(Math.ceil(counts / 12));
      setPageRound({ current: Math.ceil(urlPage / 5), total: Math.ceil(pageNumber / 5) });
      console.log('counts', counts);
    }
  }, [counts]);

  React.useEffect(() => {
    getData(searchParams);
    getLength(searchParams);
    window.scrollTo({
      top: 0
    });
  }, []);

  const Pagination = () => {
    const pageOffset = (pageRound.current - 1) * 5 + 1;
    const pageItemNumber = pageTotal > 5 ? (pageRound.current < pageRound.total ? 5 : (pageTotal - pageOffset + 1)) : pageTotal;
    const currentPage = parseInt(searchParams.page);
    return counts ? (
      <PaginationList>
        {currentPage !== 1 && (
          <PaginationItem onClick={() => onPrev(currentPage - 1)}>
            <img src={icArrow} style={{ transform: 'rotate(90deg)' }} />
          </PaginationItem>
        )}
        {Array.from({ length: pageItemNumber },
          (_, i) => (
            <PaginationItem
              className={currentPage === (i + pageOffset) ? 'active' : ''}
              key={i}
              onClick={currentPage === (i + pageOffset) ? () => { } : () => onPageChange(i + pageOffset)}
            >
              {i + pageOffset}
            </PaginationItem>
          )
        )}
        {currentPage !== pageTotal && (
          <PaginationItem onClick={() => onNext(currentPage + 1)}>
            <img src={icArrow} style={{ transform: 'rotate(-90deg)' }} />
          </PaginationItem>
        )}
      </PaginationList>
    ) : null;
  };

  const laneCity = cities.filter((n) => !/連江縣|新竹市/.test(n.name));
  return (
    <ContentWrapper>
      <PageTop>
        <SearchBoard style={{ width: 1000 }}>
          <FlexBetween style={isMobile ? { flexWrap: 'wrap' } : null}>
            <div style={isMobile ? { flexBasis: '100%' } : null}>
              <StyledSelect
                style={isMobile ? { width: '100%' } : null}
                defaultValue={searchParams.city}
                onSelect={(val) => setSearchParams((prev) => ({ ...prev, city: val }))}
                options={[{ value: '', label: '所有地區' }].concat(laneCity.map((n) => ({ value: n.key, label: n.name })))}
              />
              {!isMobile && <ButtonMain onClick={onSearch}>搜尋</ButtonMain>}
            </div>
            <FlexBetween style={isMobile ? { flexBasis: '100%' } : null}>
              {isMobile && <ButtonMain onClick={onSearch}>搜尋</ButtonMain>}
              <span>{counts} 條路線</span>
            </FlexBetween>
          </FlexBetween>
        </SearchBoard>
      </PageTop>
      <TwoColsWrapper>
      {data.map((one) => (
        <Card
          key={one.RouteName}
          data={{
            title: one.RouteName,
            location: one.RoadSectionStart ? `${one.RoadSectionStart} - ${one.RoadSectionEnd}` : one.City,
            link: one.RouteName,
            length: one.CyclingLength / 1000
          }}
          geometry={one.geometry}
          type="lane" />
      ))}
      </TwoColsWrapper>
      <Pagination />
    </ContentWrapper>
  );
};

export default BikeLane;