// hooks/useOrientationLock.js
import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export const useOrientationLock = (currentUrl, isReady) => {
  useEffect(() => {
    if (!isReady || !currentUrl) return;

    const normalizedUrl = currentUrl.toLowerCase().replace(/\/$/, '');

    const lockOrientation = async () => {
      try {
        if (normalizedUrl.startsWith('https://dbo')) {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
          console.log('Orientation locked to LANDSCAPE');
        } else if (normalizedUrl.startsWith('https://sso')) {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          console.log('Orientation locked to PORTRAIT');
        }
      } catch (err) {
        console.warn('Orientation error:', err);
      }
    };

    const timeout = setTimeout(() => {
      lockOrientation();
    }, 100); // Small delay to wait for layout

    return () => clearTimeout(timeout);
  }, [currentUrl, isReady]);
};
