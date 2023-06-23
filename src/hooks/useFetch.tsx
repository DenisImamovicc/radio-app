import { useState, useEffect } from "react";

interface FetchData {
  data: any;
  isLoading: boolean | string;
  error: boolean;
}

const useFetch = (
  url: string,
  reqMethod: string = "GET",
  reqBody: any = ""
): FetchData => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean | string>("");
  const [error, setError] = useState<boolean>(false);

  const GET = {
    method: reqMethod,
    headers: {
      Accept: "application/json",
      ...(url.includes("http://localhost:9000") && {
        Authorization: `Bearer ${document.cookie.substring(4)}`,
      }),
    },
  };

  const POST = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      credentials: "same-origin",
    },
    body: JSON.stringify(reqBody),
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, reqMethod === "GET" ? GET : POST);
      console.log(response);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();

      setData(responseData);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (url) {
      fetchData();
      setIsLoading("");
      setError(false);
    }
    setIsLoading("");
    setError(false);
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
