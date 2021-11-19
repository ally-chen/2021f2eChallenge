import styled from 'styled-components';
import { colors, desktopMedia } from '@/const';

export const ButtonSetting = styled.button`
border-radius: 30px;
border: 0;
outline: none;
font-size: 18px;
line-height: 26px;
padding: 12px 24px;
cursor: pointer;
`;

export const ButtonMain = styled(ButtonSetting)`
background: linear-gradient(180deg, rgba(229, 111, 71, 0.8) 0%, #E56F47 100%), #FFFFFF;
box-shadow: 2px 2px 4px -1px rgba(0, 0, 0, 0.25), inset 0px -1px 4px rgba(0, 0, 0, 0.3);
color: #FFFFFF;
min-width: 200px;
&:hover {
  background: linear-gradient(180deg, rgba(229, 111, 71, 0.8) 0%, #C2522D 100%), #FFFFFF;
}
`;

export const ButtonWhite = styled(ButtonSetting)`
background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
box-shadow: 2px 2px 3px -2px rgba(0, 0, 0, 0.25), inset 0px -1px 4px rgba(0, 0, 0, 0.3);
min-width: 120px;
&:hover {
  background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #F5F5F5;
}
&:focus {
  background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #F5F5F5;
  box-shadow: 2px 2px 3px -2px rgba(0, 0, 0, 0.25), inset 3px 2px 5px rgba(0, 0, 0, 0.3);
}
`;

export const SearchBoard = styled.div`
background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25), inset 0px -3px 4px rgba(0, 0, 0, 0.25);
border-radius: 40px;
padding: 13px 17px 15px;
margin: auto;
max-width: 100%;
font-size: 18px;
margin-top: 40px;
${ButtonMain} {
  min-width: 146px;
}
`;

export const MainCard = styled.div`
background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
box-shadow: 8px 48px 35px -13px rgba(0, 0, 0, 0.25), inset -4px -4px 3px -2px rgba(0, 0, 0, 0.25);
border-radius: 50px;
padding: 20px 15px 40px;
margin-bottom: 60px;
${desktopMedia(`
padding: 36px 40px;
`)}
`;

export const FullContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 17px;
  text-align: center;
  height: calc(100vh - 122px);
  padding-bottom: 21px;
  > div {
    max-width: 100%;
  }
  ${desktopMedia(`
    height: calc(100vh - 164px);
    padding-bottom: 42px;
  `)}
`;

export const ContentWrapper = styled.div`
padding: 0 17px;
${desktopMedia(`
  max-width: 1234px;
  margin: 0 auto;
`)}
`;

export const H1 = styled.h1`
color: ${colors.text};
text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
font-weight: 500;
font-size: 38px;
margin: 0.25em 0;
${desktopMedia(`
  font-size: 40px;
`)}
`;
export const H2 = styled.h2`
color: ${colors.text};
text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
font-weight: 400;
font-size: 32px;
${desktopMedia(`
  font-size: 34px;
`)}
`;
export const H3 = styled.h3`
color: ${colors.text};
font-weight: 500;
font-size: 22px;
margin: 0.75em 0 0.375em;
${desktopMedia(`
  font-size: 24px;
`)}
`;
export const H4 = styled.h4`
color: ${colors.text};
font-weight: 500;
font-size: 18px;
${desktopMedia(`
  font-size: 20px;
`)}
`;

export const BriefText = styled.div`
color: ${colors.dark};
font-size:13px;
`;

export const IconText = styled.div`
  display: flex;
  align-items:${({ size }) => size === 'lg' ? 'flex-start' : 'center'};
  ${({ size }) => size === 'lg' ? 'margin-bottom: 10px;' : ''}
  > img {
    margin-right: ${({ size }) => size === 'lg' ? '3px' : '10px'};
    width: ${({ size }) => size === 'lg' ? '30px' : '20px'};
    ${({ size }) => size === 'lg' ? 'margin-top: -2px;' : ''}
  }
`;

export const FlexBetween = styled.div`
display: flex;
justify-content:space-between;
align-items: center;
`;

export const TripleColsWrapper = styled.div`
  display:flex;
  flex-wrap: wrap;
  > * {
    flex-basis: 100%;
    max-width: 100%;
  }
  @media (min-width: 768px) {
    justify-content: space-between;
    > * {
      flex-basis: calc(50% - 20px);
      max-width: calc(50% - 20px);
    }
  }
  ${desktopMedia(`
    > * {
      flex-basis: calc(33% - 46px);
      max-width: calc(33% - 46px);
    }
  `)}
`;
export const FourColsWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > * {
    flex-basis: calc(50% - 7px);
    max-width: calc(50% - 7px);
  }
  @media (min-width: 768px) {
    > * {
      flex-basis: calc(33% - 20px);
      max-width: calc(33% - 20px);
    }
  }
  ${desktopMedia(`
    > * {
      flex-basis: calc(25% - 27px);
      max-width: calc(25% - 27px);
    }
  `)}
`;

export const AlignCenter = styled.div`
text-align:center;
`;

export const PageTop = styled.div`
padding: 20px 0 40px;
${desktopMedia(`
padding: 45px 0 137px;
`)}
`;

export const PaginationList = styled.ul`
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 80px;
`;

export const PaginationItem = styled.li`
background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
box-shadow: 2px 2px 3px -2px rgba(0, 0, 0, 0.25), inset 0px -1px 4px rgba(0, 0, 0, 0.3);
width: 36px;
height: 36px;
border-radius: 50%;
font-size: 13px;
display:flex;
align-items:center;
justify-content: center;
line-height: 1;
font-family: Arial, sans-serif;
cursor: pointer;
&:hover {
  background: linear-gradient(180deg,rgba(239,239,239,0) 0%,rgba(206,206,206,0.2) 100%),#F5F5F5;
}
&.active {
  background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #F5F5F5;
  box-shadow: 2px 2px 3px -2px rgba(0, 0, 0, 0.25), inset 3px 2px 5px rgba(0, 0, 0, 0.3);
}
> img {
  width: 16px;
}
${desktopMedia(`
width: 50px;
height: 50px;
font-size: 16px;
> img {
width: 20px;
}
`)}
+ li {
  margin-left: 10px;
}
`;
