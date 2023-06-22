import { useState, useEffect } from 'react';

interface FetchData {
    data: any;
    isLoading: boolean;
    error: string | null;
  }

const useFetch = (url:string,reqMethod:string="GET",reqBody:string=""):FetchData => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url,{
          method:"GET",
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const responseData = await response.json();
        setData(responseData);
        setError(null);
      } catch (error) {
        setError(error as string);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;