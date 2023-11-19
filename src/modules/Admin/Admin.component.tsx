import "./Admin.scss";
import "../../styles/scss/index.scss";
// // import { GlobalStyles } from "../../styles/GlobalStyle";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ConfigProvider, StyleGuide } from "@q4/nimbus-ui";
import type { MfeProps } from "@q4/platform-definitions";
import { useMemo } from "react";
import { Router } from "react-router-dom";
import { AdminContent } from "../../components/AdminContent/AdminContent.component";
import { ApolloWrapper } from "../../components/ApolloWrapper/ApolloWrapper.component";
import { FeatureFlagProvider } from "../../components/FeatureFlagProvider/FeatureFlagProvider.component";
import { GraphWrapper } from "../../components/GraphWrapper/GraphWrapper.component";
import { SessionProvider } from "../../contexts/session/session.context";
import { DefaultMfeProps } from "../../definitions/mfe.definition";
import { useVersionTag } from "../../hooks/useVersionTag/useVersionTag.hook";

// FIXME pass history to  router
const Admin = (props: MfeProps = DefaultMfeProps): JSX.Element => {
  useVersionTag();

  const emotionCache = useMemo(() => createCache({ key: "admin", container: document.body }), []);

  return (
    <ConfigProvider styleGuide={StyleGuide.V1}>
      <CacheProvider value={emotionCache}>
        <SessionProvider {...props}>
          <ApolloWrapper>
            <GraphWrapper>
              <FeatureFlagProvider>
                <Router history={props.history}>
                  <AdminContent />
                </Router>
              </FeatureFlagProvider>
            </GraphWrapper>
          </ApolloWrapper>
        </SessionProvider>
      </CacheProvider>
    </ConfigProvider>
  );
};

export default Admin;
