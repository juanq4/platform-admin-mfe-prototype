import { Opacity, Text, TextPreset, TextShade, TextSize, TextTheme, TextWeight, useVisibility } from "@q4/nimbus-ui";
import type { PropsWithChildren } from "react";
import { useMemo, useCallback, useEffect, Fragment } from "react";
import { BroadcastEventType, useBroadcast, useUser } from "../../contexts";
import { getOrganizationLabelWithTicker } from "../../utils";
import { AccountSwitchedModal } from "./ImpersonationGate.definition";
import { AccountSwitchedNotificationModal } from "./ImpersonationGate.style";

export const ImpersonationGate = (props: PropsWithChildren): JSX.Element => {
  const userContext = useUser();
  const channel = useBroadcast();
  const [isVisible, handleShow] = useVisibility();

  const organizationName = useMemo(() => getOrganizationLabelWithTicker(userContext.organization), [userContext]);

  const handleAccountSwitched = useCallback(
    (event: unknown) => {
      if (event === BroadcastEventType.AccountSwitched) {
        handleShow();
      }
    },
    [handleShow],
  );

  useEffect(() => {
    channel.addEventListener("message", handleAccountSwitched);
    return () => {
      channel.removeEventListener("message", handleAccountSwitched);
    };
  });

  return (
    <>
      <Fragment {...props} />
      <AccountSwitchedNotificationModal
        visible={isVisible}
        maskOpacity={Opacity.Medium}
        title={AccountSwitchedModal.title}
        message={
          <div>
            <Text size={TextSize.MD} preset={TextPreset.Paragraph} theme={TextTheme.Neutral} shade={TextShade.Shade700}>
              {AccountSwitchedModal.mainContent} <Text weight={TextWeight.Semibold}>{organizationName}</Text>.
            </Text>
            <Text size={TextSize.MD} preset={TextPreset.Paragraph} theme={TextTheme.Neutral} shade={TextShade.Shade700}>
              {AccountSwitchedModal.actionContent}
            </Text>
          </div>
        }
      />
    </>
  );
};
