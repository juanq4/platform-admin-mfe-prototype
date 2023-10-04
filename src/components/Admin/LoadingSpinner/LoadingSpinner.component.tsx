import { ConfigProvider as NimbusConfig, Ghostable, Spinner, SpinnerTheme, StyleGuide } from "@q4/nimbus-ui";
import { memo } from "react";
import type { AdminLoadingSpinnerProps } from "./LoadingSpinner.definition";

const AdminLoadingSpinnerBase = (props: AdminLoadingSpinnerProps): JSX.Element => {
  const { loading, ...spinnerProps } = props;

  return (
    <NimbusConfig styleGuide={StyleGuide.V1}>
      <Ghostable ghosted={!loading}>
        <Spinner masked theme={SpinnerTheme.Rain} {...spinnerProps} />
      </Ghostable>
    </NimbusConfig>
  );
};

export const AdminLoadingSpinner = memo(AdminLoadingSpinnerBase);
