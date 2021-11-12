import React from 'react';
import { useNavigate } from "react-router-dom";
import { ButtonWhite } from '@/component/ui-components';
import logo from '@/images/logo.svg';
import { useIsMobile, goToPage } from '@/const';
import { MenuWrapper, TopLogo, NavList } from './style';

// eslint-disable-next-line react/prop-types
const Menu = () => {
  const [menuCollapsed, setMenuCollapsed] = React.useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  return (
    <MenuWrapper>
      <TopLogo src={logo} />
      {isMobile && <ButtonWhite onClick={() => setMenuCollapsed((prev) => !prev)}>≡</ButtonWhite>}
      <NavList style={{ display: isMobile && !menuCollapsed ? 'none' : 'flex' }}>
        <li><ButtonWhite onClick={() => goToPage('/sites', navigate)}>全台景點</ButtonWhite></li>
        <li><ButtonWhite onClick={() => goToPage('/events', navigate)}>找活動</ButtonWhite></li>
        <li><ButtonWhite onClick={() => goToPage('/food', navigate)}>找美食</ButtonWhite></li>
        <li><ButtonWhite onClick={() => goToPage('/stay', navigate)}>找住宿</ButtonWhite></li>
        <li><ButtonWhite onClick={() => goToPage('/local', navigate)}>在地暢遊</ButtonWhite></li>
      </NavList>
    </MenuWrapper>
  );
}

export default Menu;
