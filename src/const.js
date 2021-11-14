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
};

export const colors = {
  text: '#291109',
  main: '#E56F47',
  mainLight: '#F9E3CE',
  secondary: '#C2522D',
  grey: '#A9A9A9',
  dark: '#696969'
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
