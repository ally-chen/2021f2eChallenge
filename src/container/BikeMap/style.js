import styled from 'styled-components';
import { IconText } from '@/component/ui-components';
import { colors, desktopMedia } from '@/const';

export const MapBox = styled.div`
height: 450px;
border-radius: 40px;
${desktopMedia(`
height: 540px;
`)}
`;

export const BikeCard = styled.div`
max-width: 200px;
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
