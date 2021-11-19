import styled from 'styled-components';
import { IconText, Tag } from '@/component/ui-components';
import { colors, desktopMedia } from '@/const';

export const MapBox = styled.div`
height: 450px;
border-radius: 40px;
${desktopMedia(`
height: 540px;
`)}
`;

export const BikeCard = styled.div`
width: 200px;
${Tag} {
  margin: -3px 0 3px -25px;
  background: #ffdd64;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  padding: 4px 12px;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2), inset 2px 0 2px #d7b849;
  font-size: 13px;
  color: ${colors.text};
}
`;
export const BikeInfo = styled.div`
  display: inline-block;
  width: 49%;
  vertical-align: middle;
  color: ${colors.dark};
  &.availableCounts {
    color: #67C07A;
  }
  &.unavailableCounts {
    color: #C2522D;
  }
`;
export const BikeCounts = styled.div`
  font-size: 36px;
`;

export const ReloadRow = styled.div`
text-align: right;
margin: 20px 0;
${IconText} {
  cursor: pointer;
  display: inline-flex;
}
`;
