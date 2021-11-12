
import styled from 'styled-components';

export const MenuWrapper = styled.div`
padding: 15px 21px 15px 25px;
border-radius: 40px;
background-color: #ffffff;
box-shadow: 0px 45px 73px rgba(0, 0, 0, 0.2), inset 0px -3px 4px rgba(0, 0, 0, 0.25);
max-width: 1200px;
margin: 21px 17px;
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
@media (min-width: 1024px) {
  margin: 42px auto;
  padding: 15px 18px 15px 32px;
}
`;

export const TopLogo = styled.img`
width: 120px;
@media (min-width: 1024px) {
  width: 130px;
}
`;

export const NavList = styled.ul`
list-style: none;
padding: 0;
margin: 14px -7px 0;
display: flex;
flex-basis: calc(100% + 14px);
flex-wrap: wrap;
@media (min-width: 1024px) {
  margin: 0 -5px 0 0;
  flex-basis: auto;
}
> li {
  padding: 0 7px;
  flex-basis: 50%;
  margin-bottom: 14px;
  > button {
    width: 100%;
  }
  @media (min-width: 1024px) {
    padding: 0 5px;
    margin-bottom: 0;
    flex-basis: auto;
  }
}
`;
