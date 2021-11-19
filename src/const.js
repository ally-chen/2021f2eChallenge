export const desktopMedia = (children) => `@media (min-width: 1024px){${children}}`;

export const apiRoot = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/';

export const alias = {
  sites: 'ScenicSpot',
  events: 'Activity',
  food: 'Restaurant',
  stay: 'Hotel',
};

export const auth = {
  id: process.env.REACT_APP_TDXID,
  key: process.env.REACT_APP_TDXKEY,
  gMapKey: process.env.REACT_APP_GMAPKEY,
  mapBoxToken: process.env.REACT_APP_MAPBOXTOKEN
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
    searchField2: ['', '遊憩類', '文化類', '藝術類', '古蹟類', '廟宇類', '觀光工廠類', '小吃/特產類', '生態類', '林場類', '休閒農業類', '國家公園類', '都會公園類', '體育健身類', '溫泉類', '國家風景區類', '國家公園類', '自然風景類', '森林遊樂區類', '其他'],
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
    key: 'Taipei',
    latlng: {lat: 25.04454809288478, lng: 121.53947779457634}
  },
  {
    name: '新北市',
    key: 'NewTaipei',
    latlng: {lng: 121.4627838, lat: 25.0170177}
  },
  {
    name: '桃園市',
    key: 'Taoyuan',
    latlng: {lng: 121.3009071, lat: 24.993682}
  },
  {
    name: '臺中市',
    key: 'Taichung',
    latlng: {lng: 120.6736565, lat: 24.1477718}
  },
  {
    name: '臺南市',
    key: 'Tainan',
    latlng: {lng: 120.2268219, lat: 22.9997997}
  },
  {
    name: '高雄市',
    key: 'Kaohsiung',
    latlng: {lng: 120.3014088, lat: 22.6272419}
  },
  {
    name: '基隆市',
    key: 'Keelung',
    latlng: {lng: 121.7391586, lat: 25.1275685}
  },
  {
    name: '新竹市',
    key: 'Hsinchu',
    latlng: {lng: 120.9674549, lat: 24.813849}
  },
  {
    name: '新竹縣',
    key: 'HsinchuCounty',
    latlng: {lng: 121.0177517, lat: 24.8386986}
  },
  {
    name: '苗栗縣',
    key: 'MiaoliCounty',
    latlng: {lng: 120.8214569, lat: 24.5602388}
  },
  {
    name: '彰化縣',
    key: 'ChanghuaCounty',
    latlng: {lng: 120.5161572, lat: 24.0517939}
  },
  {
    name: '南投縣',
    key: 'NantouCounty',
    latlng: {lng: 120.9718323, lat: 23.9608425}
  },
  {
    name: '雲林縣',
    key: 'YunlinCounty',
    latlng: {lng: 120.4313564, lat: 23.7092168}
  },
  {
    name: '嘉義縣',
    key: 'ChiayiCounty',
    latlng: {lng: 120.2554893, lat: 23.4518294}
  },
  {
    name: '嘉義市',
    key: 'Chiayi',
    latlng: {lng: 120.4491234, lat: 23.4800943}
  },
  {
    name: '屏東縣',
    key: 'PingtungCounty',
    latlng: {lng: 120.5488586, lat: 22.5518792}
  },
  {
    name: '宜蘭縣',
    key: 'YilanCounty',
    latlng: {lng: 121.7537498, lat: 24.7591271}
  },
  {
    name: '花蓮縣',
    key: 'HualienCounty',
    latlng: {lng: 121.601572, lat: 23.9871544}
  },
  {
    name: '臺東縣',
    key: 'TaitungCounty',
    latlng: {lng: 121.1438155, lat: 22.7613225}
  },
  {
    name: '金門縣',
    key: 'KinmenCounty',
    latlng: {lng: 118.3766556, lat: 24.4493374}
  },
  {
    name: '澎湖縣',
    key: 'PenghuCounty',
    latlng: {lng: 119.5793152, lat: 23.5712249}
  },
  {
    name: '連江縣',
    key: 'LienchiangCounty',
    latlng: {lng: 119.9516487, lat: 26.1602145}
  },
];

export const bikeCities = [
  {
    name: '臺北市',
    key: 'Taipei',
    latlng: {lat: 25.04454809288478, lng: 121.53947779457634}
  },
  {
    name: '新北市',
    key: 'NewTaipei',
    latlng: {lng: 121.4627838, lat: 25.0170177}
  },
  {
    name: '桃園市',
    key: 'Taoyuan',
    latlng: {lng: 121.3009071, lat: 24.993682}
  },
  {
    name: '臺中市',
    key: 'Taichung',
    latlng: {lng: 120.6736565, lat: 24.1477718}
  },
  {
    name: '臺南市',
    key: 'Tainan',
    latlng: {lng: 120.2268219, lat: 22.9997997}
  },
  {
    name: '高雄市',
    key: 'Kaohsiung',
    latlng: {lng: 120.3014088, lat: 22.6272419}
  },
  {
    name: '新竹市',
    key: 'Hsinchu',
    latlng: {lng: 120.9674549, lat: 24.813849}
  },
  {
    name: '苗栗縣',
    key: 'MiaoliCounty',
    latlng: {lng: 120.8214569, lat: 24.5602388}
  },
  {
    name: '嘉義市',
    key: 'Chiayi',
    latlng: {lng: 120.4491234, lat: 23.4800943}
  },
  {
    name: '屏東縣',
    key: 'PingtungCounty',
    latlng: {lng: 120.5488586, lat: 22.5518792}
  },
  {
    name: '金門縣',
    key: 'KinmenCounty',
    latlng: {lng: 118.3766556, lat: 24.4493374}
  },
];
