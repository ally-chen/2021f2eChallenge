
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { textByType } from "@/const";
import { BreadcrumbList, BreadcrumbItem } from "./style";

const Breadcrumb = ({ title }) => {

  const location = useLocation();
  const { pathname } = location;
  const [_, type] = pathname.split('/');
  return (
    <BreadcrumbList>
      <BreadcrumbItem><Link to='/'>首頁</Link></BreadcrumbItem>
      <BreadcrumbItem>/</BreadcrumbItem>
      <BreadcrumbItem><Link to={`/${type}`}>{textByType[type].pageTitle}</Link></BreadcrumbItem>
      <BreadcrumbItem>/</BreadcrumbItem>
      <BreadcrumbItem>{title}</BreadcrumbItem>
    </BreadcrumbList>
  )
};
export default Breadcrumb;

Breadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
};
