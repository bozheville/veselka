const useLink = <T>() => {
  const updateURL = (urlProps: T) => {
    var searchParams = new URLSearchParams(window.location.search);

    for (const [key, value] of Object.entries(urlProps)) {
      searchParams.set(key, value);
    }

    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    window.history.pushState(null, '', newRelativePathQuery);
  };

  return {
    updateURL,
  };
};

export default useLink;
