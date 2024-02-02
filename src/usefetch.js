import { useEffect, useState } from 'react';
// move this to useFetch.js
function useFetch(url) {
  const [responseData, setResponseData] = useState({ loading: true, data: null, error: null });
  const { loading, data, error } = responseData;

  useEffect(() => {
    // Bail if we already handled it.
    if (!loading) { return; }
    if (data !== null || error !== null) { return; }
    const fetchData = async () => {
      try {
        debugger;
        const response = await fetch(url);
        
        if (!response.ok) {
          setResponseData({ loading: false, data: data, error: response });
          return;
        }
        const data = await response.json();
        setResponseData({ loading: false, data: data, error: null });
      } catch (error) {
        setResponseData({ loading: false, data: null, error: error.message });
      }
    };

    // Fetch that data!
    setResponseData({ loading: true, data: null, error: null }); 
    fetchData();
  }, [url, loading, data, error]);

  return responseData;
}

export default useFetch;