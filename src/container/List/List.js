import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {
  ContentWrapper, ButtonMain, SearchBoard, PageTop, FlexBetween,
  H1, AlignCenter, FullContainer, PaginationList, PaginationItem
} from "@/component/ui-components";
import StyledSelect from "@/component/StyledSelect/StyledSelect";
import Empty from "@/component/Empty/Empty";
import icArrow from '@/images/dropdown-arrow.svg';
import { useIsMobileEnv, useAxiosGet, renderGrids } from "@/common";
import { textByType, cities } from "@/const";

const List = () => {
  const { query } = useAxiosGet();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;
  const [_, currentType] = pathname.split('/');
  let params = new URLSearchParams(search);
  const urlCity = params.get('city') || '';
  const urlCategory = params.get('c') || '';
  const urlPage = params.get('p') || 1;
  const urlNearby = params.get('$spatialFilter') || '';
  const [__, pointLat, pointLon] = urlNearby ? urlNearby.match(/nearby\((.+),(.+),.+\)/) : [];
  const [data, setData] = React.useState([]);
  const [counts, setCounts] = React.useState(0);
  const [pageTotal, setPageTotal] = React.useState(0);
  const [pageRound, setPageRound] = React.useState({
    current: 1,
    total: 1,
  });
  const [searchParams, setSearchParams] = React.useState({
    city: urlCity,
    category: urlCategory,
    page: urlPage
  });

  const getData = (config) => {
    query({ type: currentType, fields: textByType[currentType].queryFields, length: 12, ...config }).then((res) => {
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
    let searchString = '?';
    if (searchParams.city) {
      searchString += `city=${searchParams.city}`;
    }
    if (searchParams.category) {
      searchString += `&c=${searchParams.category}`;
    }
    navigate({ search: `${searchString}${urlNearby ? `&$spaceFilter=${urlNearby}` : ''}` });
    getData(searchParams);
    getLength(searchParams);
    setSearchParams((prev) => ({ ...prev, page: 1 }));
  };

  React.useEffect(() => {
    getData({ city: urlCity, category: urlCategory, page: urlPage });
    getLength({ city: urlCity, category: urlCategory });
    window.scrollTo({
      top: 0
    });
  }, [currentType]);

  React.useEffect(() => {
    if (counts) {
      const pageNumber = Math.ceil(counts / 12);
      setPageTotal(Math.ceil(counts / 12));
      setPageRound({ current: Math.ceil(urlPage / 5), total: Math.ceil(pageNumber / 5) });
      console.log('counts', counts);
    }
  }, [counts]);

  React.useEffect(() => {
    if (searchParams) {
      console.log('searchParams', searchParams);
    }
  }, [searchParams]);

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

  const isMobile = useIsMobileEnv();
  const text = textByType[currentType];
  return (
    <ContentWrapper>
      <PageTop>
        <AlignCenter><H1>{text.pageTitle}</H1></AlignCenter>
        <SearchBoard style={{ width: 1000 }}>
          <FlexBetween style={isMobile ? { flexWrap: 'wrap' } : null}>
            {urlNearby ? (
              <div>
                ({pointLon.substr(0, 5)}, {pointLat.substr(0, 4)}) 附近的{text.label}
                {<ButtonMain onClick={() => navigate(`/${currentType}`)} style={{marginLeft: 8}}>返回搜尋</ButtonMain>}
              </div>
            ) : (
              <>
                <div style={isMobile ? { flexBasis: '100%' } : null}>
                  <StyledSelect
                    defaultValue={searchParams.city}
                    onSelect={(val) => setSearchParams((prev) => ({ ...prev, city: val }))}
                    options={[{ value: '', label: text.searchField1 }].concat(cities.map((n) => ({ value: n.key, label: n.name })))}
                  />
                  <StyledSelect
                    defaultValue={searchParams.category}
                    onSelect={(val) => setSearchParams((prev) => ({ ...prev, category: val }))}
                    options={text.searchField2.map((n) => ({ value: n, label: n || text.searchField2All }))}
                  />
                  {!isMobile && <ButtonMain onClick={onSearch}>搜尋</ButtonMain>}
                </div>
                {isMobile && <ButtonMain onClick={onSearch}>搜尋</ButtonMain>}
              </>
            )}
            <span>{text.total(counts)}</span>
          </FlexBetween>
        </SearchBoard>
      </PageTop>
      {data.length > 0 ? renderGrids(data, currentType) : <FullContainer style={{ height: 'auto' }}><Empty text={text.noMatch} /></FullContainer>}
      <Pagination />
    </ContentWrapper>
  );
};
export default List;
