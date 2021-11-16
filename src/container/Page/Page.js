/* eslint-disable no-undef */
import React from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import { useNavigate, useParams } from "react-router-dom";
import {
  ContentWrapper, IconText, BriefText, FlexBetween,
  H1, H2, ButtonWhite, ButtonMain, FullContainer
} from "@/component/ui-components";
import Breadcrumb from "@/component/Breadcrumb/Breadcrumb";
import Empty from "@/component/Empty/Empty";
import NotFound from '@/container/NotFound/NotFound';
import iconMapMark from '@/images/Marker.svg';
import iconStar from '@/images/Star.svg';
import iconClock from '@/images/Clock.svg';
import iconInfo from '@/images/Info.svg';
import iconParking from '@/images/Parking.svg';
import iconPrice from '@/images/Price.svg';
import { useAxiosGet, renderImg, formatDate, renderGrids } from "@/common";
import { textByType, auth } from "@/const";
import { MainCard, FigureContainer, CategoryLink, InlineInfo, MainInfoWrapper, DetailWrapper } from "./style";

const starByText = {
  '一星級': 1,
  '二星級': 2,
  '三星級': 3,
  '四星級': 4,
  '五星級': 5,
};

const Page = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [data, setData] = React.useState(null);
  const [relatedData, setRelatedData] = React.useState(null);
  const { query } = useAxiosGet();
  const text = textByType[type];
  const relatedTopic = Object.keys(textByType).filter((n) => n !== type);
  const ref = React.useRef(null);

  if (!/sites|food|stay|events/.test(type)) {
    return <NotFound />;
  }

  const getRelatedData = (latitude, longitude) => {
    Promise.all(relatedTopic.map((topic) => query({
      type: topic,
      fields: textByType[topic].queryFields,
      length: topic === 'food' ? 4 : 3,
      nearby: {latitude, longitude}
    }))).then((results) => {
      const relatedObj = {};
      relatedTopic.forEach((n, i) => {
        const emptyNumber = results[i].length % (n === 'food' ? 4 : 3);
        const emptyItem = emptyNumber !== 0 ? Array.from({ length: emptyNumber }, (_, i) => ({ ID: i })) : [];
        relatedObj[n] = results[i].concat(emptyItem);
      });
      setRelatedData(relatedObj);
    });
  };

  const goCategory = (c) => {
    navigate({ pathname: `/${type}`, search: `?c=${c}` });
  };

  const goOutside = (link) => {
    window.open(link);
  };

  React.useEffect(() => {
    if (data && data.Position) {
      const { PositionLon, PositionLat } = data.Position;
      let map;

      const loader = new Loader({
        apiKey: auth.gMapKey,
        version: "weekly",
      });

      loader.load().then(() => {
        map = new google.maps.Map(ref.current, {
          center: { lat: PositionLat, lng: PositionLon },
          zoom: 15,
        });
        const infowindow = new google.maps.InfoWindow({
          content: data.Name,
        });
        const marker = new google.maps.Marker({
          position: { lat: PositionLat, lng: PositionLon },
          map,
          title: data.Name,
        });
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: true,
          });
        });
      });
      getRelatedData(PositionLat, PositionLon);
    }
  }, [data]);

  React.useEffect(() => {
    if (id) {
      query({ type, id }).then((res) => {
        setData(res[0]);
      });
      window.scrollTo({
        top: 0
      });
    }
  }, [id]);

  const categoryList = ['Class', 'Class1', 'Class2', 'Class3']
  .map((n) => data ? data[n] : '').filter((v) => v) // 濾掉空值
  .filter((n, i, arr) => arr.indexOf(n) === i); // 濾掉重複

  return (
    <ContentWrapper>
      {data ? (
        <MainCard>
          <Breadcrumb title={data.Name} />
          <FigureContainer style={{ backgroundImage: renderImg(type, data.Picture.PictureUrl1 || '') }} />
          <MainInfoWrapper>
            <FlexBetween style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div>
                <H1>{data.Name}</H1>
                <InlineInfo>
                  <IconText style={{ marginRight: 20 }}>
                    <img src={iconMapMark} style={{ marginRight: 8 }} />
                    <BriefText>{data.Location || (data.Address || data.City)}</BriefText>
                  </IconText>
                  {categoryList.map((c) => (<CategoryLink key={c} onClick={() => goCategory(c)}>{c}</CategoryLink>))}
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
              </div>
              <div>
                {data.Phone && <ButtonWhite onClick={() => goOutside(`tel:${data.Phone}`)}>{data.Phone}</ButtonWhite>}
                {data.WebsiteUrl && <ButtonMain onClick={() => goOutside(data.WebsiteUrl)}>官方網站</ButtonMain>}
              </div>
            </FlexBetween>
            <div className="mapWrapper">
              <div id="map" ref={ref} style={{ height: "100%" }} />
            </div>
          </MainInfoWrapper>
          <DetailWrapper>{(data.DescriptionDetail || data.Description)}</DetailWrapper>
        </MainCard>
      ) : (
        <FullContainer>
          {data === undefined && <Empty text="找不到這筆資料，請重新搜尋。" />}
        </FullContainer>
      )}
      {relatedTopic.map((topic) => relatedData && relatedData[topic] && relatedData[topic].length > 0 ? (
        <section key={topic}>
          <FlexBetween>
            <H2>{textByType[topic].relatedTitle}</H2>
            <ButtonMain onClick={() => navigate(`/${topic}?$spatialFilter=nearby(${data.Position.PositionLat},${data.Position.PositionLon},10000)`)}>更多附近{textByType[topic].label}</ButtonMain>
          </FlexBetween>
          {renderGrids(relatedData[topic], topic)}
        </section>
      ) : null)}
    </ContentWrapper>
  );
};
export default Page;
