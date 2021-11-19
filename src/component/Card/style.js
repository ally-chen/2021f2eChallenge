import styled from 'styled-components';
import { H3, FourColsWrapper } from '@/component/ui-components';
import { colors, desktopMedia } from '@/const';

export const LinkText = styled.div`
color: ${colors.main};
text-align: center;
margin-top: 8px;
font-size: 16px;
${desktopMedia(`
font-size: 18px;
`)};
`;

export const MiniMap = styled.div`
  height: 200px;
  border-radius: 40px;
`;

export const CardWrapper = styled.div`
background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
box-shadow: 8px 48px 35px -13px rgba(0, 0, 0, 0.25), inset -4px -4px 3px -2px rgba(0, 0, 0, 0.25);
border-radius: 50px;
padding: 19px 23px 24px;
margin-bottom: 34px;
cursor: pointer;
${FourColsWrapper} &{
  padding: 10px;
}
${H3} {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
&:hover {
  background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #F5F5F5;
  ${LinkText} {
    font-weight: bold;
  }
}
${desktopMedia(`
  padding: 20px 18px 27px;
  margin-bottom: 76px;
  ${FourColsWrapper} &{
    padding: 20px 18px 27px;
  }
`)};
`;

export const FigureContainer = styled.div`
background-size: cover;
background-position: center;
background-repeat: no-repeat;
height: 194px;
border-radius: 40px;
${FourColsWrapper} &{
  height: 129px;
}
${desktopMedia(`
  height: 208px;
  ${FourColsWrapper} &{
    height: 208px;
  }
`)};
`;
