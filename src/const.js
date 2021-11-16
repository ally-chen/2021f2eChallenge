export const desktopMedia = (children) => `@media (min-width: 1024px){${children}}`;

export const apiRoot = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/';

export const alias = {
  sites: 'ScenicSpot',
  events: 'Activity',
  food: 'Restaurant',
  stay: 'Hotel',
};

export const auth = {
  id: '64958ee551c04190a4957935fc7071b8',
  key: '3fa_GOG04qfPPcd4A5o4WTKAkk8',
  gMapKey: 'AIzaSyDXnsysqJjsQX_Pv2ig4e5n1Ea4p53mgk8'
};

export const colors = {
  text: '#291109',
  main: '#E56F47',
  mainLight: '#F9E3CE',
  secondary: '#C2522D',
  grey: '#A9A9A9',
  dark: '#696969'
};


export const textByType = {
  sites: {
    label: '景點',
    pageTitle: '找景點',
    searchField1: '全台景點',
    searchField2: ['', '文化類', '古蹟類', '廟宇類', '生態類', '都會公園類', '體育健身類', '溫泉類', '遊憩類', '國家風景區類', '自然風景類', '其他'],
    searchField2All: '所有景點',
    total: (countsNum) => `${countsNum} 個景點`,
    noMatch: '沒有符合的景點，\n再換其他條件試試吧！',
    relatedTitle: '附近景點',
    priceKey: 'TicketInfo',
    priceEmpty: '依現場為主',
    timeEmpty: '依現場為主',
    queryFields: 'ID,Name,City,Address,Picture'
  },
  events: {
    label: '活動',
    pageTitle: '找活動',
    searchField1: '全台活動',
    searchField2: ['', '節慶活動', '藝文活動', '年度活動', '自行車活動', '遊憩活動', '活動快報', '其他'],
    searchField2All: '所有活動',
    total: (countsNum) => `共 ${countsNum} 項`,
    noMatch: '沒有符合的活動，\n再換其他條件試試吧！',
    relatedTitle: '附近活動',
    priceKey: 'Charge',
    priceEmpty: '無',
    timeEmpty: '依現場營業時間為準',
    urlEmpty: '未提供',
    queryFields: 'ID,Name,City,Location,Address,Picture,StartTime,EndTime'
  },
  food: {
    label: '美食',
    pageTitle: '找美食',
    searchField1: '全台美食',
    searchField2: ['', '異國料理', '中式美食', '地方特產', '甜點冰品', '夜市小吃', '素食', '伴手禮', '其他'],
    searchField2All: '所有美食',
    total: (countsNum) => `${countsNum} 項美食`,
    noMatch: '沒有符合的美食，\n再換其他條件試試吧！',
    relatedTitle: '附近美食',
    timeEmpty: '依現場營業時間為準',
    queryFields: 'ID,Name,City,Address,Picture'
  },
  stay: {
    label: '住宿',
    pageTitle: '找住宿',
    searchField1: '全台旅宿',
    searchField2: ['', '一般旅館', '國際觀光旅館', '一般觀光旅館', '民宿'],
    searchField2All: '所有類型',
    total: (countsNum) => `共 ${countsNum} 家`,
    noMatch: '沒有符合的旅宿，\n再換其他條件試試吧！',
    relatedTitle: '推薦住宿',
    priceKey: 'Spec',
    priceEmpty: '請洽旅宿業者',
    parkingEmpty: '請洽旅宿業者',
    infoEmpty: '依現場為主',
    queryFields: 'ID,Name,City,Address,Picture'
  },
};

// https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON

export const cities = [
  {
    name: '臺北市',
    key: 'Taipei'
  },
  {
    name: '新北市',
    key: 'NewTaipei'
  },
  {
    name: '桃園市',
    key: 'Taoyuan'
  },
  {
    name: '臺中市',
    key: 'Taichung'
  },
  {
    name: '臺南市',
    key: 'Tainan'
  },
  {
    name: '高雄市',
    key: 'Kaohsiung'
  },
  {
    name: '基隆市',
    key: 'Keelung'
  },
  {
    name: '新竹市',
    key: 'Hsinchu'
  },
  {
    name: '新竹縣',
    key: 'HsinchuCounty'
  },
  {
    name: '苗栗縣',
    key: 'MiaoliCounty'
  },
  {
    name: '彰化縣',
    key: 'ChanghuaCounty'
  },
  {
    name: '南投縣',
    key: 'NantouCounty'
  },
  {
    name: '雲林縣',
    key: 'YunlinCounty'
  },
  {
    name: '嘉義縣',
    key: 'ChiayiCounty'
  },
  {
    name: '嘉義市',
    key: 'Chiayi'
  },
  {
    name: '屏東縣',
    key: 'PingtungCounty'
  },
  {
    name: '宜蘭縣',
    key: 'YilanCounty'
  },
  {
    name: '花蓮縣',
    key: 'HualienCounty'
  },
  {
    name: '臺東縣',
    key: 'TaitungCounty'
  },
  {
    name: '金門縣',
    key: 'KinmenCounty'
  },
  {
    name: '澎湖縣',
    key: 'PenghuCounty'
  },
  {
    name: '連江縣',
    key: 'LienchiangCounty'
  },
];
