import { ContentWrapper, ButtonMain, SearchBoard, PageTop, FlexBetween,
  H1, TripleColsWrapper, AlignCenter } from "@/component/ui-components";
import StyledSelect from "@/component/StyledSelect/StyledSelect";
import Card from "@/component/Card/Card";
import { useSearch, useIsMobileEnv } from "@/common";
import { cities } from "@/const";

export const textByType = {
  sites: {
    pageTitle: '找景點',
    searchField1: '全台景點',
    searchField2: ['', '歷史文化', '戶外踏青', '藍色水岸', '宗教巡禮', '軍旅探索', '夜市商圈', '風景區'],
    searchField2All: '所有景點',
    total: (countsNum) => `${countsNum} 個景點`
  },
  stay: {
    pageTitle: '找住宿',
    searchField1: '全台旅宿',
    searchField2: ['', '一般旅館', '國際觀光旅館', '一般觀光旅館', '民宿'],
    searchField2All: '所有類型',
    total: (countsNum) => `共 ${countsNum} 家`
  },
  events: {
    pageTitle: '找活動',
    searchField1: '全台活動',
    searchField2: ['', '節慶活動', '藝文活動', '年度活動', '自行車活動', '遊憩活動', '活動快報', '其他'],
    searchField2All: '所有活動',
    total: (countsNum) => `共 ${countsNum} 項`
  },
  food: {
    pageTitle: '找美食',
    searchField1: '全台美食',
    searchField2: ['', '異國料理', '中式美食', '地方特產', '甜點冰品', '夜市小吃', '素食', '伴手禮', '其他'],
    searchField2All: '所有美食',
    total: (countsNum) => `${countsNum} 項美食`
  }
};

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
                onSelect={(val) => setSearchParams((prev) => ({...prev, city: val}))}
                options={[{value: '', label: text.searchField1}].concat(cities.map((n) => ({value: n.key, label: n.name})))}
              />
              <StyledSelect
                defaultValue={searchParams.category}
                onSelect={(val) => setSearchParams((prev) => ({...prev, category: val}))}
                options={text.searchField2.map((n) => ({value: n, label: n || text.searchField2All}))}
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
