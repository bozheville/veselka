import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { stringify } from 'query-string';

import { UrlProps } from 'pages/Wheel/types';

const useLink = <T>() => {
  const router = useRouter();
  const { query } = router;

  const setURL = useCallback((urlProps: T) => {
    router.push(
      `/?${stringify(urlProps || {})}`,
      undefined,
      { shallow: true }
    );
  }, [router]);

  const updateURL = useCallback((update: T) => {
    const urlProps = {
      ...query,
      ...update,
    };

    setURL(urlProps);
  }, [query, setURL]);

  return {
    setURL,
    updateURL,
    queryParams: query as UrlProps,
  };
};

export default useLink;
