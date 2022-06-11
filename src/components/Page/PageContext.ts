import React, { useState } from 'react';

export const usePageContext = () => {
  const [title, setTitle] = useState('');

  return {
    title,
    setTitle,
  };
}

const PageDataContext = React.createContext({
  title: '',
  setTitle: (newTitle: string) => {},
});

export default PageDataContext;
