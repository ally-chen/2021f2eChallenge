import styled from 'styled-components';

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
`;

export const ButtonWhite = styled(ButtonSetting)`
background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
box-shadow: 2px 2px 3px -2px rgba(0, 0, 0, 0.25), inset 0px -1px 4px rgba(0, 0, 0, 0.3);
min-width: 120px;
&:hover, &:focus {
  background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #F5F5F5;
  box-shadow: 2px 2px 3px -2px rgba(0, 0, 0, 0.25), inset 3px 2px 5px rgba(0, 0, 0, 0.3);
}
`;

