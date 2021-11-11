import React from 'react';
import { MenuWrapper, TopLogo, NavList } from './style';
import { ButtonWhite } from '../ui-components';
import logo from '../../images/logo.svg';
import { useIsMobile } from '../../const';

const Menu = () => {
  const [menuCollapsed, setMenuCollapsed] = React.useState(false);
  const isMobile = useIsMobile();
  return (
    <MenuWrapper>
      <TopLogo src={logo} />
      {isMobile && <ButtonWhite onClick={() => setMenuCollapsed((prev) => !prev)}>≡</ButtonWhite>}
      <NavList style={{ display: isMobile && !menuCollapsed ? 'none' : 'flex' }}>
        <li><ButtonWhite>全台景點</ButtonWhite></li>
        <li><ButtonWhite>找活動</ButtonWhite></li>
        <li><ButtonWhite>找美食</ButtonWhite></li>
        <li><ButtonWhite>找住宿</ButtonWhite></li>
        <li><ButtonWhite>在地暢遊</ButtonWhite></li>
      </NavList>
    </MenuWrapper>
  );
}

export default Menu;
