import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { ContentWrapper, ButtonWhite } from '@/component/ui-components';
import logo from '@/images/logo.svg';
import menu from '@/images/menu.svg';
import menuOpening from '@/images/menu-2.svg';
import { useIsMobile } from '@/common';
import { MenuWrapper, TopLogo, NavList, MenuButtonWrapper } from './style';

const Menu = () => {
  const [menuCollapsed, setMenuCollapsed] = React.useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const onNavItemClick = (path) => {
    setMenuCollapsed(false);
    navigate(path);
  };
  return (
    <ContentWrapper style={{ position: 'sticky', top: 12, zIndex: 2 }}>
      <MenuWrapper>
        <Link to="/"><TopLogo src={logo} /></Link>
        {isMobile && <MenuButtonWrapper onClick={() => setMenuCollapsed((prev) => !prev)}><img src={menuCollapsed ? menuOpening : menu} /></MenuButtonWrapper>}
        <NavList style={{ display: isMobile && !menuCollapsed ? 'none' : 'flex' }}>
          <li><ButtonWhite onClick={() => onNavItemClick('/sites')}>全台景點</ButtonWhite></li>
          <li><ButtonWhite onClick={() => onNavItemClick('/events')}>找活動</ButtonWhite></li>
          <li><ButtonWhite onClick={() => onNavItemClick('/food')}>找美食</ButtonWhite></li>
          <li><ButtonWhite onClick={() => onNavItemClick('/stay')}>找住宿</ButtonWhite></li>
          <li><ButtonWhite onClick={() => onNavItemClick('/bike')}>騎鐵馬</ButtonWhite></li>
          {/* <li><ButtonWhite onClick={() => onNavItemClick('/local')}>在地暢遊</ButtonWhite></li> */}
        </NavList>
      </MenuWrapper>
    </ContentWrapper>
  );
}

export default Menu;
