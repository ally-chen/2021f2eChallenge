import { useNavigate } from "react-router-dom";
import { FullContainer, ButtonMain } from '@/component/ui-components';
import { goToPage } from '@/common';
import imgNotFound from '@/images/404.svg';
import {OverwriteBody, NotFoundText} from './style';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <OverwriteBody />
      <FullContainer>
        <div>
          <NotFoundText src={imgNotFound} />
          <p>這個頁面不存在，到其他地方去看看吧！</p>
          <ButtonMain onClick={() => goToPage('/', navigate)}>前往首頁</ButtonMain>
        </div>
      </FullContainer>
    </>
  );
};
export default NotFound;