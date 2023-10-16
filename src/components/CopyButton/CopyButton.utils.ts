import { isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { CopyButtonDefault } from "./CopyButton.definition";
import type { CopyButtonProps } from "./CopyButton.definition";

export function getCopyButtonSuccessMessage(label: CopyButtonProps["label"]): string {
  const labelValue = _getDefaultLabel(label);
  return `The ${labelValue} has been copied to your clipboard.`;
}

export function getCopyButtonFailureMessage(label: CopyButtonProps["label"]): string {
  const labelValue = _getDefaultLabel(label);
  return `The ${labelValue} failed to copy to your clipboard.`;
}

export function isCopyButtonDisabled(value: CopyButtonProps["value"]): boolean {
  return isNullOrWhiteSpace(value);
}

function _getDefaultLabel(label: CopyButtonProps["label"]) {
  return isNullOrWhiteSpace(label) ? CopyButtonDefault.Label : label;
}
