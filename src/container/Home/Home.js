import React from 'react';
// import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import {
  FullContainer, ContentWrapper, ButtonMain, SearchBoard, FlexBetween,
  H2, H4, FourColsWrapper, AlignCenter
} from "@/component/ui-components";
import imgHomeLogo from "@/images/home-logo.svg";
import imgCloud from "@/images/cloud.png";
import imgCloudBlur from "@/images/cloud-blur.png";
import imgTraveler from "@/images/Saly-15.png";
import imgTraveler2 from "@/images/Saly-14.png";
import icStay1 from "@/images/icon-stay-1.png";
import icStay2 from "@/images/icon-stay-2.png";
import icStay3 from "@/images/icon-stay-3.png";
import icStay4 from "@/images/icon-stay-4.png";
import imgBoat from "@/images/boat.png";
import imgBus from "@/images/bus.png";
import imgBicycle from "@/images/bicycle.png";
import StyledSelect from "@/component/StyledSelect/StyledSelect";
import { cities } from "@/const";
import { useAxiosGet, useIsMobileEnv, renderGrids } from "@/common";
import { OverwriteBody, HomeLogo, Slogan, Deco, QuickLinks, SimpleCard } from './style';

const stayIcons = [icStay1, icStay2, icStay3, icStay4];

const Home = () => {
  const [homeData, setHomeData] = React.useState({
    sites: [],
    events: [],
    food: [],
  });
  const [searchParams, setSearchParams] = React.useState({
    type: 'sites',
    city: 'Taipei',
  });
  // const [currentPos, setCurrentPos] = React.useState(null);
  const navigate = useNavigate();
  const isMobile = useIsMobileEnv();
  const { query } = useAxiosGet();
  const onSearch = () => {
    navigate({
      pathname: searchParams.type,
      search: `?city=${searchParams.city}`
    })
  };

  const initData = () => {
    Promise.all([
      query({
        type: 'sites',
        fields: 'ID,Name,City,Address,Picture',
        length: 6,
      }),
      query({
        type: 'events',
        fields: 'ID,Name,City,Location,Address,Picture,StartTime,EndTime',
        length: 3,
      }),
      query({
        type: 'food',
        fields: 'ID,Name,City,Address,Picture',
        length: 8,
      }),
    ]).then((results) => {
      console.log('res', results);
      setHomeData({
        sites: results[0].sort(() => Math.random() <= 0.5 ? 1 : -1),
        events: results[1].sort(() => Math.random() <= 0.5 ? 1 : -1),
        food: results[2].sort(() => Math.random() <= 0.5 ? 1 : -1)
      });
    });
  };

  React.useEffect(() => {
    initData();
    // navigator.geolocation.getCurrentPosition((res) => {
    //   setCurrentPos(res.coords)
    // });
  }, []);
  // React.useEffect(() => {
  //   if (currentPos) {
  //     getSites(currentPos);
  //   }
  // }, [currentPos]);

  return (
    <>
      <OverwriteBody />
      <FullContainer>
        <Deco className="floating" src={imgCloud} desktop={{ width: 261, right: 'calc(50vw - 640px)', top: '-2%' }} mobile={{ right: -90, top: '15%' }} />
        <Deco src={imgCloudBlur} desktop={{ width: 651, left: 'calc(50vw - 924px)', bottom: -120 }} mobile={{ width: 356, left: -237, bottom: '24%' }} />
        <Deco src={imgTraveler} desktop={{ width: 320, right: 'calc(50vw - 680px)', bottom: -200 }} mobile={{ width: 172, right: -30, bottom: -30 }} style={{ transform: 'rotate(15deg)' }} />
        <div>
          <HomeLogo src={imgHomeLogo} alt="????????????" />
          <Slogan>???????????????????????????</Slogan>
          <SearchBoard style={{ width: 660 }}>
            <FlexBetween style={isMobile ? { flexWrap: 'wrap' } : null}>
              <div style={isMobile ? { flexBasis: '100%' } : null}>
                <StyledSelect
                  defaultValue={searchParams.city}
                  options={cities.map((n) => ({ value: n.key, label: n.name }))}
                  onSelect={(val) => setSearchParams((prev) => ({ ...prev, city: val }))}
                />
                <StyledSelect
                  defaultValue={searchParams.type}
                  onSelect={(val) => setSearchParams((prev) => ({ ...prev, type: val }))}
                  options={[{ value: 'sites', label: '?????????' }, { value: 'stay', label: '?????????' }, { value: 'food', label: '?????????' }, { value: 'events', label: '?????????' }]}
                />
              </div>
              <ButtonMain onClick={onSearch} style={{ width: isMobile ? '100%' : 'auto' }}>??????</ButtonMain>
            </FlexBetween>
          </SearchBoard>
        </div>
      </FullContainer>
      <ContentWrapper>
        <AlignCenter><H2>????????????</H2></AlignCenter>
        {/* <Slider dots="true" speed={500} slidesToShow={1} slidesToScroll={1}>
          {homeData.sites.map((one) => (
            <Card
              key={one.ID}
              data={{title: one.Name, location: one.City || one.Address.substr(0, 3), link: `/${one.ID}`, figure: one.Picture.PictureUrl1 || ''}}
              type="sites" />
          ))}
        </Slider> */}
        {renderGrids(homeData.sites, 'sites')}
        <AlignCenter><Link to="sites"><ButtonMain>???????????????</ButtonMain></Link></AlignCenter>
      </ContentWrapper>
      <FullContainer style={{ height: 'auto' }}>
        <Deco className="floating" src={imgCloud} desktop={{ width: 261, left: -40, bottom: -100 }} mobile={{ left: -87, bottom: 180 }} />
        <Deco src={imgCloudBlur} desktop={{ width: 546, right: -235, bottom: -200 }} mobile={{ width: 297, right: -145, bottom: 80 }} style={{ transform: 'scaleX(-1)' }} />
      </FullContainer>
      <ContentWrapper>
        <AlignCenter><H2>????????????</H2></AlignCenter>
        {renderGrids(homeData.events, 'events')}
        <AlignCenter><Link to="events"><ButtonMain>???????????????</ButtonMain></Link></AlignCenter>
      </ContentWrapper>
      <FullContainer style={{ height: 'auto' }}>
        <Deco className="floating" src={imgCloud} desktop={{ width: 303, right: -20, bottom: -100 }} mobile={{ width: 137, right: 20, bottom: 20 }} />
        <Deco src={imgTraveler2} desktop={{ width: 350, left: 'calc(50vw - 700px)', top: '60%' }} mobile={{ width: 140, left: -10, top: '84%' }} style={{ zIndex: -1, transform: 'rotate(-8deg)' }} />
      </FullContainer>
      <ContentWrapper>
        <AlignCenter><H2>???????????????</H2></AlignCenter>
        {renderGrids(homeData.food, 'food')}
        <AlignCenter><Link to="food"><ButtonMain>??????????????????</ButtonMain></Link></AlignCenter>
      </ContentWrapper>
      <FullContainer style={{ height: 'auto' }}>
        <Deco src={imgCloud} desktop={{ width: 303, left: 'calc(50vw - 550px)', bottom: -120 }} mobile={{ width: 125, left: -10, bottom: 30 }} />
        <Deco className="floating" src={imgCloud} desktop={{ width: 206, left: 'calc(50vw - 410px)', bottom: -180 }} mobile={{ width: 85, left: 57, bottom: 5 }} />
      </FullContainer>
      <ContentWrapper>
        <AlignCenter><H2>????????????</H2></AlignCenter>
        <FourColsWrapper>
          {['????????????', '??????????????????', '??????????????????', '??????'].map((n, i) => (
            <Link to={`stay?c=${n}`} key={n}>
              <SimpleCard>
                <div>
                  <img src={stayIcons[i]} />
                  <H4>{n}</H4>
                </div>
              </SimpleCard>
            </Link>
          ))}
        </FourColsWrapper>
      </ContentWrapper>
      <FullContainer style={{ height: 'auto' }}>
        <Deco src={imgCloudBlur} desktop={{ width: 530, left: -250, top: -20 }} mobile={{ left: -300, bottom: 30 }} style={{ transform: 'scaleX(-1)' }} />
        <Deco src={imgCloudBlur} desktop={{ width: 530, right: -330, top: 220 }} mobile={{ right: -300, bottom: 30 }} />
        <Deco src={imgBoat} desktop={{ width: 276, right: 80, top: 120 }} mobile={{ width: 143, right: -34, bottom: -50 }} />
      </FullContainer>
      <ContentWrapper>
        <AlignCenter><H2>????????????</H2></AlignCenter>
        <QuickLinks>
          <SimpleCard onClick={() => navigate('/bike')}>
            <div>
              <img src={imgBicycle} />
              <H4>??????????????????</H4>
            </div>
          </SimpleCard>
          <SimpleCard>
            <div>
              <img src={imgBus} />
              <H4>??????????????????</H4>
            </div>
          </SimpleCard>
        </QuickLinks>
      </ContentWrapper>
    </>
  );
};

export default Home;
