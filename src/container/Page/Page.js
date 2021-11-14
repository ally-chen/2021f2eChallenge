/* eslint-disable no-undef */
import React from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import { useLocation, useNavigate } from "react-router-dom";
import { ContentWrapper, IconText, BriefText,
  H1, ButtonWhite, ButtonMain } from "@/component/ui-components";
import Breadcrumb from "@/component/Breadcrumb/Breadcrumb";
import NotFound from '@/container/NotFound/NotFound';
import iconMapMark from '@/images/Marker.svg';
import iconStar from '@/images/Star.svg';
import iconClock from '@/images/Clock.svg';
import iconInfo from '@/images/Info.svg';
import iconParking from '@/images/Parking.svg';
import iconPrice from '@/images/Price.svg';
import { useAxiosGet, renderImg, formatDate, goToPage } from "@/common";
import { MainCard, FigureContainer, CategoryLink, InlineInfo, MainInfoWrapper } from "./style";

const starByText = {
  '一星級': 1,
  '二星級': 2,
  '三星級': 3,
  '四星級': 4,
  '五星級': 5,
};

const textByType = {
  sites: {
    priceKey: 'TicketInfo',
    priceEmpty: '依現場為主',
    timeEmpty: '依現場為主',
  },
  events: {
    priceKey: 'Charge',
    priceEmpty: '無',
    timeEmpty: '依現場營業時間為準',
    urlEmpty: '未提供'
  },
  stay: {
    priceKey: 'Spec',
    priceEmpty: '請洽旅宿業者',
    parkingEmpty: '請洽旅宿業者',
    infoEmpty: '依現場為主'
  },
  food: {
    timeEmpty: '依現場營業時間為準'
  }
};

const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = React.useState(null);
  const { query } = useAxiosGet();
  const [_, type, id] = location.pathname.split('/');

  const goCategory = (c) => {
    goToPage({pathname: `/${type}`, search: `?c=${c}`}, navigate);
  };

  React.useEffect(() => {
    query({type, id}).then((res) => {
      setData(res[0]);
    });
  }, []);
  React.useEffect(() => {
    if (data && data.Position) {
      const {PositionLon, PositionLat} = data.Position;
      let map;
    
      const loader = new Loader({
        apiKey: "AIzaSyDXnsysqJjsQX_Pv2ig4e5n1Ea4p53mgk8",
        version: "weekly",
      });
      
      loader.load().then(() => {
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: PositionLat, lng: PositionLon },
          zoom: 18,
        });
        new google.maps.Marker({
          position: { lat: PositionLat, lng: PositionLon },
          map,
          title: data.Name,
        });
      });
    }
  }, [data]);

  const text = textByType[type];

  return data ? (
    <ContentWrapper>
      <MainCard>
        <Breadcrumb title={data.Name} />
        <FigureContainer style={{backgroundImage: renderImg(type, data.Picture.PictureUrl1 || '')}} />
        <MainInfoWrapper>
          <div>
            <H1>{data.Name}</H1>
            <InlineInfo>
              <IconText style={{marginRight: 20}}>
                <img src={iconMapMark} style={{ marginRight: 8 }} />
                <BriefText>{data.Address || data.Location || data.City}</BriefText>
              </IconText>
              {data.Class && <CategoryLink onClick={() => goCategory(data.Class)}>{data.Class}</CategoryLink>}
              {data.Class1 && <CategoryLink onClick={() => goCategory(data.Class1)}>{data.Class1}</CategoryLink>}
              {data.Class2 && <CategoryLink onClick={() => goCategory(data.Class2)}>{data.Class2}</CategoryLink>}
              {data.Class3 && <CategoryLink onClick={() => goCategory(data.Class3)}>{data.Class3}</CategoryLink>}
              {data.Grade && <IconText>{Array.from({ length: starByText[data.Grade] }, (_, i) => <img key={i} src={iconStar} />)}</IconText>}
            </InlineInfo>
            {type !== 'stay' && (
              <IconText size="lg">
                <img src={iconClock} />
                <span>
                  {type === 'food' ? `營業時間：${data.OpenTime || text.timeEmpty}` : ''}
                  {type === 'sites' ? (data.OpenTime || text.timeEmpty) : ''}
                  {type === 'events' ? (data.StartTime && data.EndTime ? `${formatDate(data.StartTime)} ~ ${formatDate(data.EndTime)}` : text.timeEmpty) : ''}
                </span>
              </IconText>
            )}
            {type !== 'food' && (
              <IconText size="lg">
                <img src={iconPrice} />
                <span>{/events/.test(type) ? '票價資訊：' : '價位：'}{data[text.priceKey] || text.priceEmpty}</span>
              </IconText>
            )}
            {(data.ParkingInfo || type === 'stay') && (
              <IconText size="lg">
                <img src={iconParking} />
                <span>停車資訊：{data.ParkingInfo || (type === 'stay' ? '請洽旅宿業者' : '依現場為主')}</span>
              </IconText>
            )}
            {data.ServiceInfo && (
              <IconText size="lg">
                <img src={iconInfo} />
                <span>服務設施：{data.ServiceInfo}</span>
              </IconText>
            )}
            {data.Phone && <ButtonWhite>{data.Phone}</ButtonWhite>}
            {data.WebsiteUrl && <ButtonMain>官方網站</ButtonMain>}
          </div>
          <div className="mapWrapper">
            <div id="map" style={{height: "100%"}} />
          </div>
        </MainInfoWrapper>
      </MainCard>
    </ContentWrapper>
  ) : <NotFound />;
};
export default Page;
