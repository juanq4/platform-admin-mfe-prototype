import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useAccessTokenTemp = (): {
  value: string;
  isLoading: boolean;
  error: Error;
} => {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    getAccessTokenSilently?.()
      .then(setValue)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [getAccessTokenSilently]);

  return {
    value,
    isLoading,
    error,
  };
};
