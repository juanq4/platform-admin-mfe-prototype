import "./CopyButton.scss";
import { Button, ButtonTheme, NotificationService } from "@q4/nimbus-ui";
import { memo, useCallback, useMemo, useRef } from "react";
import type { CopyButtonProps } from "./CopyButton.definition";
import { CopyButtonClassName, CopyButtonIdModel } from "./CopyButton.definition";
import { getCopyButtonFailureMessage, getCopyButtonSuccessMessage, isCopyButtonDisabled } from "./CopyButton.utils";

const CopyButtonBase = (props: CopyButtonProps): JSX.Element => {
  const notificationServiceRef = useRef(new NotificationService());

  const { id, label, value } = props;

  const idModel = useMemo(() => new CopyButtonIdModel(id), [id]);
  const disabled = useMemo(() => isCopyButtonDisabled(value), [value]);

  const copyToClipboard = useCallback((): void => {
    const { current: notificationService } = notificationServiceRef;

    notificationService.dismiss();
    navigator.clipboard
      .writeText(value)
      .then(() => {
        notificationService.success(getCopyButtonSuccessMessage(label));
      })
      .catch(() => {
        notificationService.error(getCopyButtonFailureMessage(label));
      });
  }, [label, value]);

  return (
    <Button
      id={idModel.id}
      className={CopyButtonClassName.Base}
      theme={ButtonTheme.None}
      icon="q4i-clone-duplicate-4pt"
      disabled={disabled}
      stopPropagation
      onClick={copyToClipboard}
    />
  );
};
export const CopyButton = memo(CopyButtonBase);
