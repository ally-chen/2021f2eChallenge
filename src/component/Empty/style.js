import styled from 'styled-components';
import { desktopMedia } from '@/const';

export const TextWrapper = styled.div`
background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
box-shadow: 2px 2px 3px -2px rgba(0, 0, 0, 0.25), inset 0px -1px 4px rgba(0, 0, 0, 0.3);
border-radius: 96px;
width: 240px;
padding: 20px;
margin-bottom: -18px;
white-space: pre;
${desktopMedia(`
padding: 35px 20px;
width: 320px;
margin-bottom: -22px;
`)}
`;

export const EmptyWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 300px;
${desktopMedia(`
width: 405px;
`)}
`;
