import type { IdToken } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppRoutePath } from "../../configurations/navigation.configuration";
import { TokenClaim } from "../../definitions";
import { useOrganizationQuery, useUserQuery } from "../../schemas/generated/graphql";
import { managedOrganizationIdKey } from "../../trunk/AuthWrapper/AuthWrapper.definition";
import { throwError } from "../../utils/error/error.utils";
import type { UserContextState, UserProviderProps } from "./user.definition";
import { updatePendoOrganization } from "./user.utils";

export const UserContext = createContext<Partial<UserContextState>>({});

export const UserProvider = (props: UserProviderProps): JSX.Element => {
  const auth0 = useAuth0();
  const history = useHistory();

  const [managedOrganizationId, setManagedOrganizationId] = useState<string>(
    localStorage.getItem(managedOrganizationIdKey) || null,
  );
  const [claims, setClaims] = useState<IdToken | undefined>();
  const [isManagedOrganizationLoading, setIsManagedOrganizationLoading] = useState<boolean>(true);
  const userId = useMemo(() => auth0.user[TokenClaim.UserId], [auth0.user]);
  // this is always the ID of user's organization
  const organizationId = useMemo(() => claims?.[TokenClaim.OrganizationId], [claims]);
  // this is either the ID of user's organization or the ID of the impersonated client
  const currentOrganizationId = useMemo(() => claims?.[TokenClaim.NewClaimOrganizationId], [claims]);
  const [adminShowClientSelector, setAdminShowClientSelector] = useState(false);

  const user = useUserQuery({
    variables: {
      id: organizationId,
      userId,
    },
    skip: !organizationId,
  });

  const organization = useOrganizationQuery({
    variables: {
      id: currentOrganizationId,
    },
    notifyOnNetworkStatusChange: true,
    skip: !currentOrganizationId,
  });

  const isImpersonatingClient = useMemo(
    // TODO: Switch away from TokenClaim.OrganizationId after the next release
    () => claims && claims[TokenClaim.NewClaimOrganizationId] !== claims[TokenClaim.OrganizationId],
    [claims],
  );

  const handleManageOrganizationIdChange = useCallback(
    (id: string | null) => {
      setManagedOrganizationId(id);
      setIsManagedOrganizationLoading(true);
      history.replace(AppRoutePath.Default);
      setAdminShowClientSelector(!adminShowClientSelector);
    },
    [adminShowClientSelector, history],
  );

  useEffect(() => {
    localStorage.setItem(managedOrganizationIdKey, managedOrganizationId);
  }, [managedOrganizationId]);

  useEffect(() => {
    const options = { ignoreCache: true, managedOrganizationId: managedOrganizationId || undefined };

    auth0
      .getAccessTokenSilently(options)
      .then(() => auth0.getIdTokenClaims())
      .then((newClaims) => {
        setClaims(newClaims);
        setIsManagedOrganizationLoading(false);
      });
  }, [auth0, managedOrganizationId]);

  useEffect(() => {
    if (organization?.data?.organization) {
      updatePendoOrganization(organization.data.organization);
    }
  }, [organization?.data?.organization]);

  if (user?.error || organization?.error) {
    throwError("Account", new Error(user?.error?.message || organization?.error?.message));
  }

  const handleSetAdminClientSelector = (showSelector: boolean) => {
    setAdminShowClientSelector(showSelector);
    if (showSelector) {
      history.push("/");
    }
  };

  return (
    <UserContext.Provider
      value={{
        userId, // TODO: Remove ids from context after queries stop requiring them
        organizationId, // TODO: Remove ids from context after queries stop requiring them
        currentOrganizationId, // TODO: Remove ids from context after queries stop requiring them
        claims,
        user: user?.data?.user,
        organization: organization?.data?.organization,
        adminShowClientSelector,
        isManagedOrganizationLoading,
        isImpersonatingClient,
        managedOrganizationId,
        onManagedOrganizationIdChange: handleManageOrganizationIdChange,
        onSetAdminClientSelector: handleSetAdminClientSelector,
        setClaims,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
