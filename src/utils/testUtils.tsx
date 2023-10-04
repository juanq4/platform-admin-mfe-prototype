/* eslint-disable import/export */
import { MockedProvider as ApolloMockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@emotion/react";
import { StyleGuide, ConfigProvider as NimbusConfig } from "@q4/nimbus-ui";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import theme from "../styles/theme";

// https://testing-library.com/docs/react-testing-library/setup/
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">,
  styleGuide = StyleGuide.V2,
): RenderResult =>
  render(ui, {
    // Common middleware to all tests
    wrapper: ({ children }) => (
      <NimbusConfig styleGuide={styleGuide}>
        <ApolloMockedProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ApolloMockedProvider>
      </NimbusConfig>
    ),
    ...options,
  });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
