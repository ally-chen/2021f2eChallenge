import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { H3, BriefText, IconText } from '@/component/ui-components';
import { renderImg } from '@/common';
import iconMapMark from '@/images/Marker.svg';
import { CardWrapper, LinkText, FigureContainer } from './style';

const Card = ({ data, type }) => {
  const { title, location, link, figure } = data;
  const navigate = useNavigate();
  const onCardClick = () => {
    navigate(`/${type}${link}`);
  };
  return (
    <CardWrapper onClick={onCardClick} title={title}>
      <FigureContainer style={{ backgroundImage: renderImg(type, figure) }} />
      <H3>{title}</H3>
      <IconText>
        <img src={iconMapMark} />
        <BriefText>{location}</BriefText>
      </IconText>
      <LinkText>了解更多</LinkText>
    </CardWrapper>
  );
};

export default Card;

Card.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    duration: PropTypes.string,
    figure: PropTypes.string
  }).isRequired,
  type: PropTypes.string.isRequired,
};

Card.defaultProps = {
  data: {
    duration: '',
    figure: '',
  },
};
