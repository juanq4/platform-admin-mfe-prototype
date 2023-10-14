import type { IdToken } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useIdTokenClaims = (): IdToken | undefined => {
  const { getIdTokenClaims } = useAuth0();
  const [idToken, setIdToken] = useState<IdToken>(undefined);

  useEffect(() => {
    getIdTokenClaims().then(setIdToken);
  }, [getIdTokenClaims, setIdToken]);

  return idToken;
};
