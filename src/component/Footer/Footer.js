import { ContentWrapper, FlexBetween } from "@/component/ui-components";
import { FooterWrapper } from "./style";

const Footer = () => (
  <FooterWrapper>
    <ContentWrapper>
      <FlexBetween style={{alignItems: 'flex-end'}}>
        <span>台灣好好 版權所有© 2021</span>
        <span>
          UI: <a href="https://medium.com/@wenchien0213" target="_blank" rel="noreferrer">Wen Chien</a><br />
          F2E: <a href="https://ally-chen.github.io/" target="_blank" rel="noreferrer">Ally Chen</a>
        </span>
      </FlexBetween>
    </ContentWrapper>
  </FooterWrapper>
);

export default Footer;
