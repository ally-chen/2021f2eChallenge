import PropTypes from 'prop-types';
import imgEmpty from '@/images/Saly-17.png';
import { TextWrapper, EmptyWrapper } from "./style";

const Empty = ({ text }) => (
  <EmptyWrapper>
    <TextWrapper>{text}</TextWrapper>
    <img src={imgEmpty} />
  </EmptyWrapper>
);

export default Empty;
Empty.propTypes = {
  text: PropTypes.string.isRequired,
};
