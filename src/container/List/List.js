import React from 'react';
import {
  ContentWrapper, ButtonMain, SearchBoard, PageTop, FlexBetween,
  H1, AlignCenter, FullContainer
} from "@/component/ui-components";
import StyledSelect from "@/component/StyledSelect/StyledSelect";
import Empty from "@/component/Empty/Empty";
import { useSearch, useIsMobileEnv, renderGrids } from "@/common";
import { textByType, cities } from "@/const";

const List = () => {
  const {
    currentType: type,
    data,
    counts,
    searchParams,
    setSearchParams,
    onSearch,
    Pagination
  } = useSearch();

  React.useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);

  const isMobile = useIsMobileEnv();
  const text = textByType[type];
  return (
    <ContentWrapper>
      <PageTop>
        <AlignCenter><H1>{text.pageTitle}</H1></AlignCenter>
        <SearchBoard style={{ width: 1000 }}>
          <FlexBetween style={isMobile ? { flexWrap: 'wrap' } : null}>
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
            <span>{text.total(counts)}</span>
          </FlexBetween>
        </SearchBoard>
      </PageTop>
      {data.length > 0 ? renderGrids(data, type) : <FullContainer style={{height: 'auto'}}><Empty text={text.noMatch} /></FullContainer>}
      <Pagination />
    </ContentWrapper>
  );
};
export default List;
