import type { ConfigProps } from "@q4/nimbus-ui";
import { ConfigProvider, ConfigContext, StyleGuide } from "@q4/nimbus-ui";

export const NimbusConfig = {
  ConfigProvider,
};

export function NimbusProviderImplementationMock(props: ConfigProps): JSX.Element {
  const { Provider } = ConfigContext;
  return <Provider value={{ styleGuide: StyleGuide.V1 }}>{props.children}</Provider>;
}
