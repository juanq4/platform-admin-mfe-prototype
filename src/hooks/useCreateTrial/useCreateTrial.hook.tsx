import type { FetchResult } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { TrialDefinitions } from "@q4/platform-sdk-definitions";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useClaims, useToastNotificationService } from "..";
import { useUser } from "../../contexts/user/user.hook";
import type { CreateTrialMutation } from "../../schemas/generated/graphql";
import { useCreateTrialMutation } from "../../schemas/generated/graphql";
import { GET_ORGANIZATION_QUERY } from "../_apollo/useOrganization/useOrganization.hook";
import { useMutationObserver } from "../useMutationObserver/useMutationObserver.hook";
import { TrialMessage } from "./components/TrialMessage.component";
import type { InitiateTrialProps, TrialContextValues } from "./useCreateTrial.definition";
import { trialButtonConfigs } from "./useCreateTrial.definition";
import { generateErrorState } from "./useCreateTrial.util";

export const useCreateTrial = (): TrialContextValues => {
  const auth0 = useAuth0();
  const notifications = useToastNotificationService();
  const client = useApolloClient();
  const history = useHistory();
  const { setClaims } = useClaims();
  const { isImpersonatingClient, managedOrganizationId } = useUser();

  const [isTrialInitializing, setIsTrialInitializing] = useState<boolean>(false);

  const [createTrialMutation] = useCreateTrialMutation();

  const initiateTrial = useCallback(
    (props: InitiateTrialProps) => {
      const { trialType, path, trialMessage } = props;

      setIsTrialInitializing(true);

      const handleTrialError = (err: Error) => {
        console.error(err);
        setIsTrialInitializing(false);

        const errorWording = generateErrorState(err?.message);
        const notification = errorWording?.type === "warn" ? notifications.current.warn : notifications.current.error;
        notification(<TrialMessage title={errorWording?.title} message={errorWording?.description} />, {
          className: "trial-toast",
          autoClose: 1000 * 60 * 1.5,
        });
      };

      const showSuccessMessage = () =>
        notifications.current.success(<TrialMessage title="Trial started successfully!" message={trialMessage} />, {
          className: "trial-toast",
          autoClose: 1000 * 60 * 1.5,
        });

      const handleTrialSuccess = (
        payload: FetchResult<CreateTrialMutation, Record<string, unknown>, Record<string, unknown>>,
      ) => {
        const errorCode = payload?.errors?.[0].extensions?.code;
        if (!!errorCode) {
          handleTrialError(new Error(errorCode as string));
          return;
        }

        if (window.location.pathname !== path) {
          const options = {
            ignoreCache: true,
            ...(isImpersonatingClient ? { managedOrganizationId } : {}),
          };
          auth0
            .getAccessTokenSilently(options)
            .then(() => auth0.getIdTokenClaims())
            .then((newClaims) => {
              setClaims(newClaims);
              // refetch the entitlements for the current org. This will update it on the MFE
              client.refetchQueries({
                include: [GET_ORGANIZATION_QUERY],
              });
              showSuccessMessage();
              history.push(path);
              setIsTrialInitializing(false);
            });
          return;
        }

        showSuccessMessage();
        setTimeout(() => window.location.reload(), 2000);
      };

      createTrialMutation({
        variables: {
          trialType,
        },
        // The following policy allows us to get the error code from EDS
        errorPolicy: "all",
      })
        .then(handleTrialSuccess)
        .catch(handleTrialError);
    },
    [auth0, client, createTrialMutation, history, isImpersonatingClient, managedOrganizationId, notifications, setClaims],
  );

  useMutationObserver(
    useCallback(() => {
      const pendoGuide = document.getElementById("pendo-base");

      if (pendoGuide && pendoGuide.style.visibility == "visible") {
        trialButtonConfigs.forEach((trialButtonConfig) => {
          const trialButtonId = `pendo-button-trial::${TrialDefinitions[trialButtonConfig.trialType].entitlement}`;
          const trialButton = document.getElementById(trialButtonId);
          if (trialButton) {
            trialButton.onclick = () => {
              initiateTrial(trialButtonConfig);
            };
          }
        });
      }
    }, [initiateTrial]),
  );

  return {
    isTrialInitializing,
  };
};
