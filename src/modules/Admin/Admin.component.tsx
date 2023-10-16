import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ConfigProvider, StyleGuide } from "@q4/nimbus-ui";
import type { MfeProps } from "@q4/platform-definitions";
import React, { useMemo } from "react";
import { AdminContent } from "../../components/AdminContent/AdminContent.component";
import { SessionProvider } from "../../contexts/session/session.context";
import { DefaultMfeProps } from "../../definitions/mfe.definition";
import { useVersionTag } from "../../hooks/useVersionTag/useVersionTag.hook";

const Admin = (props: MfeProps = DefaultMfeProps): JSX.Element => {
  useVersionTag();

  const emotionCache = useMemo(() => createCache({ key: "admin", container: document.body }), []);

  return (
    <ConfigProvider styleGuide={StyleGuide.V1}>
      <CacheProvider value={emotionCache}>
        {/* <ApolloWrapper token={props.token}> */}
        <SessionProvider {...props}>
          {/* <FeatureFlagProvider> */}
          <AdminContent />
          {/* </FeatureFlagProvider> */}
        </SessionProvider>
        {/* </ApolloWrapper> */}
      </CacheProvider>
    </ConfigProvider>
  );
};

export default Admin;
