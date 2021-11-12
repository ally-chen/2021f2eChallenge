import React from 'react';

const checkIsMobile = () => {
  if (typeof window === 'undefined') {
    return true;
  }
  return window.innerWidth < 1024;
};

export const useIsMobile = () => {
  // Initialize the desktop size to an accurate value on initial state set
  const [isMobileSize, setIsMobileSize] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const autoResize = () => {
      setIsMobileSize(checkIsMobile());
    }

    window.addEventListener('resize', autoResize);

    autoResize();

    // Return a function to disconnect the event listener
    return () => window.removeEventListener('resize', autoResize);
  }, [])

  return isMobileSize;
};

export const goToPage = (path, navigate) => {
  navigate(path);
};
