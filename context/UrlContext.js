// context/UrlContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Set isReady to true once currentUrl is non-null
  useEffect(() => {
    if (currentUrl) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [currentUrl]);

  return (
    <UrlContext.Provider value={{ currentUrl, setCurrentUrl, isReady }}>
      {children}
    </UrlContext.Provider>
  );
};
