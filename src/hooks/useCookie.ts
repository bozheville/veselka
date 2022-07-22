import { useState } from 'react';

export const useCookie = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = typeof window !== 'undefined'
      ? window.document.cookie.split(';').find((cookie) => cookie.trim().startsWith(`${key}=`))?.trim().split('=')[1]
      : null;

      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });



  const setCookie = (value: T)=> {
    setValue(value);
    document.cookie = `${key}=${JSON.stringify(value)}`;
  };

  return [value, setCookie];
}
