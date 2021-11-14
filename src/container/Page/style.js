import styled from 'styled-components';
import { colors, desktopMedia } from '@/const';

export const MainCard = styled.div`
background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
box-shadow: 8px 48px 35px -13px rgba(0, 0, 0, 0.25), inset -4px -4px 3px -2px rgba(0, 0, 0, 0.25);
border-radius: 50px;
padding: 20px 15px;
${desktopMedia(`
padding: 36px 40px;
`)}
`;

export const FigureContainer = styled.div`
background-color: #c4c4c4;
background-size: cover;
background-position: center;
background-repeat: no-repeat;
border-radius: 40px;
&:before {
  content: '';
  padding-bottom: 60%;
  width: 100%;
  display:block;
}
`;

export const CategoryLink = styled.button`
  color: ${colors.main};
  text-decoration: underline;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${colors.secondary};
  }
`;

export const InlineInfo = styled.div`
display: flex;
align-items: center;
flex-wrap: wrap;
margin-bottom: 30px;
> * {
  margin-right: 10px;
}
`;