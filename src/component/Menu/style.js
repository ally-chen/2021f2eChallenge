
import styled from 'styled-components';
import { desktopMedia } from '@/const';

export const MenuWrapper = styled.div`
padding: 15px 21px 15px 25px;
border-radius: 40px;
background-color: #ffffff;
box-shadow: 0px 45px 73px rgba(0, 0, 0, 0.2), inset 0px -3px 4px rgba(0, 0, 0, 0.25);
margin: 21px 0;
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
${desktopMedia(`
  margin: 42px 0;
  padding: 15px 18px 15px 32px;
`)}
`;

export const TopLogo = styled.img`
width: 120px;
${desktopMedia(`
  width: 130px;
`)}
`;

export const NavList = styled.ul`
list-style: none;
padding: 0;
margin: 14px -7px 0;
display: flex;
flex-basis: calc(100% + 14px);
flex-wrap: wrap;
${desktopMedia(`
  margin: 0 -5px 0 0;
  flex-basis: auto;
`)}
> li {
  padding: 0 7px;
  flex-basis: 50%;
  margin-bottom: 14px;
  > button {
    width: 100%;
  }
  ${desktopMedia(`
    padding: 0 5px;
    margin-bottom: 0;
    flex-basis: auto;
  `)}
}
`;

export const MenuButtonWrapper = styled.button`
padding: 0;
border:0;
background: none;
border-radius: 50%;
width: 50px;
font-size: 0;
img {
  width: 100%;
}
`;
