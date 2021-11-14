import styled, { createGlobalStyle } from 'styled-components';
import { desktopMedia } from '@/const';

export const OverwriteBody = createGlobalStyle`
body {
  background: none;
}
`;
export const NotFoundText = styled.img`
width: 231px;
${desktopMedia(`
  width: 462px;
`)}
`;