import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FullContainer, H2 } from '@/component/ui-components';
import { desktopMedia } from '@/const';

const floating = keyframes`
  from {
    transform: translateY(0);
  }

  33% {
    transform: translateY(-8px);
  }

  67% {
    transform: translateY(8px);
  }

  to {
    transform: translateY(0);
  }
`;

export const OverwriteBody = createGlobalStyle`
body {
    background-position: 56% -50px;
    background-size: auto 5580px;
    ${desktopMedia(`
        background-position: 64% 160px;
        background-size: auto 6000px;
    `)};
}
${FullContainer} {
    padding-bottom: 180px;
    margin-bottom: 30px;
    position: relative;
    ${desktopMedia(`
        padding-bottom: 40px;
        margin-bottom: 200px;
    `)};
}
${H2} {
    margin-bottom: 35px;
    ${desktopMedia(`
        margin-bottom: 62px;
    `)};
}
`;

export const HomeLogo = styled.img`
    width: 272px;
    ${desktopMedia(`
        width: 510px;
    `)};
`;

export const Slogan = styled.div`
    color: #000;
    font-size: 22px;
    margin: 12px 0 0;
    ${desktopMedia(`
        font-size: 24px;
        margin: 40px 0 0;
    `)};
`;

const getLength = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  return `${value}px`;
};

export const Deco = styled.img`
position: absolute;
width: ${({ mobile }) => mobile.width ? getLength(mobile.width) : '151px'};
${({ mobile }) => mobile.top ? `top: ${getLength(mobile.top)}` : ''};
${({ mobile }) => mobile.right ? `right: ${getLength(mobile.right)}` : ''};
${({ mobile }) => mobile.left ? `left: ${getLength(mobile.left)}` : ''};
${({ mobile }) => mobile.bottom ? `bottom: ${getLength(mobile.bottom)}` : ''};
&.floating {
    animation: ${floating} 6s linear infinite;
}
${({ desktop }) => desktopMedia(`
    width: ${desktop.width ? getLength(desktop.width) : '303px'};
    ${desktop.top ? `top: ${getLength(desktop.top)}` : ''};
    ${desktop.right ? `right: ${getLength(desktop.right)}` : ''};
    ${desktop.left ? `left: ${getLength(desktop.left)}` : ''};
    ${desktop.bottom ? `bottom: ${getLength(desktop.bottom)}` : ''};
`)};
`;

export const SimpleCard = styled.div`
background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
box-shadow: 8px 48px 35px -13px rgba(0, 0, 0, 0.25), inset -4px -4px 3px -2px rgba(0, 0, 0, 0.25);
border-radius: 50px;
display: flex;
align-items: center;
justify-content: center;
text-align:center;
padding-top:34px;
margin-bottom: 10px;
img {
    width: 60px;
}
${desktopMedia(`
padding-top:76px;
img {
    width: 110px;
}
`)}
`;

export const QuickLinks = styled.div`
display: flex;
justify-content: space-between;
max-width: 920px;
margin: auto;
> * {
    flex-basis: calc(50% - 14px);
    &${SimpleCard} {
      padding-top: 20px;
      img {
          width: 75%;
      }
      h4 {
        margin: 0 0 1em;
      }
      ${desktopMedia(`
      padding: 30px 0;
      img {
          width: 300px;
      }
      `)}
    }
}
`;
