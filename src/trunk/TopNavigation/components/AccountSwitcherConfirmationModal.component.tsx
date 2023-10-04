import type { MessageProps } from "@q4/nimbus-ui";
import { Text, TextPreset, TextShade, TextSize, TextTheme, TextWeight } from "@q4/nimbus-ui";
import { useCallback } from "react";
import { BroadcastEventType, useBroadcast, useUser } from "../../../contexts";
import { AccoundSwitcherConfirmationModalText } from "./AccountSwitcherConfirmationModal.defintion";
import { AccountSwitcherConfirmation } from "./AccountSwitcherConfirmationModal.style";

export const AccountSwitcherConfirmationModal = (
  props: Pick<MessageProps, "visible" | "onCloseRequest"> & { organizationName: string },
): JSX.Element => {
  const { visible, onCloseRequest, organizationName } = props;

  const userContext = useUser();
  const channel = useBroadcast();

  const handleConfirmation = useCallback(() => {
    onCloseRequest();
    channel.postMessage(BroadcastEventType.AccountSwitched);
    userContext.onManagedOrganizationIdChange(null);
  }, [onCloseRequest, channel, userContext]);

  return (
    <AccountSwitcherConfirmation
      focusOnProps={{
        autoFocus: false,
      }}
      visible={visible}
      onCloseRequest={onCloseRequest}
      title={AccoundSwitcherConfirmationModalText.Title}
      message={
        <div>
          <Text size={TextSize.MD} preset={TextPreset.Paragraph} theme={TextTheme.Neutral} shade={TextShade.Shade700}>
            {AccoundSwitcherConfirmationModalText.CurrentlyManaging}{" "}
            <Text weight={TextWeight.Semibold}>{organizationName}</Text>. {AccoundSwitcherConfirmationModalText.Confirm}
          </Text>
          <Text size={TextSize.MD} preset={TextPreset.Paragraph} theme={TextTheme.Neutral} shade={TextShade.Shade700}>
            {AccoundSwitcherConfirmationModalText.Info}
          </Text>
          <Text size={TextSize.MD} preset={TextPreset.Paragraph} theme={TextTheme.Error} shade={TextShade.Shade500}>
            {AccoundSwitcherConfirmationModalText.Warning}
          </Text>
        </div>
      }
      primaryActionProps={{
        label: AccoundSwitcherConfirmationModalText.Return,
        onClick: handleConfirmation,
      }}
    />
  );
};
