// context/UrlContext.js
import React, { createContext, useState } from 'react';

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(null);

  return (
    <UrlContext.Provider value={{ currentUrl, setCurrentUrl }}>
      {children}
    </UrlContext.Provider>
  );
};
