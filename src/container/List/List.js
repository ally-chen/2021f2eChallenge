import {
  ContentWrapper, ButtonMain, SearchBoard, PageTop, FlexBetween,
  H1, TripleColsWrapper, AlignCenter
} from "@/component/ui-components";
import StyledSelect from "@/component/StyledSelect/StyledSelect";
import Card from "@/component/Card/Card";
import { useSearch, useIsMobileEnv } from "@/common";
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
      <TripleColsWrapper>
        {data.map((one) => one.Name ? (
          <Card
            key={one.ID}
            data={{
              title: one.Name,
              location: one.City || one.Location || one.Address.substr(0, 3),
              link: `/${one.ID}`, figure: one.Picture.PictureUrl1 || ''
            }}
            type={type} />
        ) : <div />)}
      </TripleColsWrapper>
      <Pagination />
    </ContentWrapper>
  );
};
export default List;
