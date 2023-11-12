import "./Admin.scss";
import "../../styles/scss/index.scss";
// // import { GlobalStyles } from "../../styles/GlobalStyle";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ConfigProvider, StyleGuide } from "@q4/nimbus-ui";
import type { MfeProps } from "@q4/platform-definitions";
import { useMemo } from "react";
import { AdminContent } from "../../components/AdminContent/AdminContent.component";
import { UserProvider } from "../../contexts/user/user.context";
import { DefaultMfeProps } from "../../definitions/mfe.definition";
import { useVersionTag } from "../../hooks/useVersionTag/useVersionTag.hook";

// FIXME pass history to  router
const Admin = (props: MfeProps = DefaultMfeProps): JSX.Element => {
  useVersionTag();

  const emotionCache = useMemo(() => createCache({ key: "admin", container: document.body }), []);

  // return (
  //   // <ConfigProvider styleGuide={StyleGuide.V1}>
  //   <CacheProvider value={emotionCache}>
  //     {/* <ApolloWrapper token={props.token}> */}
  //     {/* <SessionProvider {...props}> */}
  //     {/* <UserProvider> */}
  //     {/* <FeatureFlagProvider> */}
  //     {/* <AdminContent /> */}
  //     {/* </FeatureFlagProvider> */}
  //     {/* </UserProvider> */}
  //     {/* </ApolloWrapper> */}
  //   </CacheProvider>
  //   // </ConfigProvider>
  // );

  return (
    <ConfigProvider styleGuide={StyleGuide.V1}>
      <CacheProvider value={emotionCache}>
        {/* <ApolloWrapper token={props.token}>
          <SessionProvider {...props}>
            <FeatureFlagProvider>
              <Router history={props.history}>
                <HomeContent />
              </Router>
            </FeatureFlagProvider>
          </SessionProvider>
        </ApolloWrapper> */}
      </CacheProvider>
    </ConfigProvider>
  );
};

export default Admin;
