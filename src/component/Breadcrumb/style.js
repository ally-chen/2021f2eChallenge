import styled from 'styled-components';
import { colors } from '@/const';

export const BreadcrumbList = styled.ul`
display: flex;
align-items: center;
margin-bottom: 30px;
`;

export const BreadcrumbItem = styled.li`
padding: 0 3px;
> a {
  color: ${colors.main};
  text-decoration: underline;
  &:focus, &:visited {
    color: ${colors.main};
  }
  &:hover {
    color: ${colors.secondary};
  }
}
`;
