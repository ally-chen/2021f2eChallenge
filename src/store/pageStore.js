import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const PageContext = createContext();

export const usePageStore = () => useContext(PageContext);

export const PageContextProvider = ({ children }) => {
  const [pageData, setPageData] = React.useState(null);

  return (
    <PageContext.Provider
      value={{
        pageData,
        setPageData,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

PageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
