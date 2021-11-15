import styled from 'styled-components';
import {colors} from '@/const';

export const FooterWrapper = styled.div`
padding: 60px 0;
color: #fff;
font-size: 13px;
a {
  margin-left: 4px;
  text-decoration: underline;
  color: ${colors.main};
  &:visited {
    color: ${colors.main};
  }
  &:hover {
    color: ${colors.secondary};
  }
}
`;
