import { useAuth0 } from "@auth0/auth0-react";
import { Brand, ButtonSize, ButtonTheme, ErrorBoundary, Fallback, Spinner, useV1Brand } from "@q4/nimbus-ui";
import type { Permission } from "@q4/platform-definitions";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import { Email } from "../../configurations";
import { useApplication, useUser } from "../../contexts";
import { useClaims, useIdTokenClaims, useAccessTokenTemp } from "../../hooks";
import { useCurrentOrganization } from "../../hooks/_apollo";
import { logoutAndUpdateLocalStorage } from "../../utils/logout/logout.utils";
import { ApplicationSummary } from "../ApplicationSummary/ApplicationSummary.component";
import { MfeKey, Mfes } from "./MfeApp.definition";
import type { MfeProps, MfeAppProps } from "./MfeApp.definition";

const Mfe = (props: MfeProps): JSX.Element => {
  const { id } = props;

  useV1Brand(Brand.Peacock);
  const { user } = useUser();
  const organization = useCurrentOrganization();
  const idTokenClaims = useIdTokenClaims();
  const accessToken = useAccessTokenTemp();
  const claims = useClaims();
  const isUsingMobile = useMediaQuery({ query: "(max-width: 428px)" });
  const application = useApplication();
  const auth0 = useAuth0();
  const history = useHistory();

  if (organization.loading || !idTokenClaims?.__raw || accessToken.isLoading) {
    return (
      <div id={id}>
        <Spinner id="spinner" />
      </div>
    );
  }

  const { error } = [organization, accessToken].find((el) => !!el.error) || {};

  if (error) {
    throw error;
  }

  const displayApplicationSummary = isUsingMobile && id !== MfeKey.Home;

  const Mfe = Mfes[id];

  return (
    <div>
      {displayApplicationSummary && <ApplicationSummary name={application.name} tier={application.tier} />}
      <Suspense fallback={<Spinner />}>
        <Mfe
          context={{
            userId: claims.userId,
            organization: organization.data.organization,
            // TODO: remove role, deprecated
            role: user.roles,
            roles: user.roles,
            // TODO: remove claims, deprecated
            claims: {
              __raw: idTokenClaims?.__raw,
              email: auth0.user?.email,
              email_verified: auth0.user?.email_verified,
              name: auth0.user?.name,
              nickname: auth0.user?.nickname,
            },
            // TODO: remove entitlements, deprecated
            entitlements: organization.data.organization.entitlements,
          }}
          user={{
            ...user,
            id: user.id,
            active: user.active,
            email: user.email,
          }}
          permissions={claims.permissions as unknown as Permission[]}
          token={accessToken.value}
          history={history}
          onError={console.error}
          brand={Brand.Peacock}
        />
      </Suspense>
    </div>
  );
};

export const MfeApp = (props: MfeAppProps): JSX.Element => {
  const { logout } = useAuth0();

  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <Fallback
          email={Email.Support}
          placeholderContentProps={{
            actions: [
              {
                label: "Refresh",
                theme: ButtonTheme.Primary,
                size: ButtonSize.Small,
                onClick: () => window.location.reload(),
              },
              {
                className: "fallback-signout-btn",
                label: "Sign out",
                size: ButtonSize.Small,
                onClick: () => logoutAndUpdateLocalStorage(logout),
              },
            ],
          }}
        />
      )}
    >
      <Mfe {...props} />
    </ErrorBoundary>
  );
};
