// import createCache from "@emotion/cache";
// import { CacheProvider } from "@emotion/react";
// import { ConfigProvider, StyleGuide } from "@q4/nimbus-ui";
// import type { MfeProps } from "@q4/platform-definitions";
// import React, { useMemo } from "react";
// import { Router } from "react-router-dom";
// import { ApolloWrapper } from "../../components/apolloWrapper/apolloWrapper.component";
// import { FeatureFlagProvider } from "../../components/featureFlagProvider/featureFlagProvider.component";
// import { HomeContent } from "../../components/homeContent/homeContent.component";
// import { SessionProvider } from "../../contexts/session/session.context";
// import { DefaultMfeProps } from "../../definitions/mfe.definition";
// import { useVersionTag } from "../../hooks/useVersionTag/useVersionTag.hook";

// const Admin = (props: MfeProps = DefaultMfeProps): JSX.Element => {
//   useVersionTag();

//   const emotionCache = useMemo(() => createCache({ key: "home", container: document.body }), []);

//   return (
//     <ConfigProvider styleGuide={StyleGuide.V2} brand="peacock">
//       <CacheProvider value={emotionCache}>
//         <ApolloWrapper token={props.token}>
//           <SessionProvider {...props}>
//             <FeatureFlagProvider>
//               <Router history={props.history}>
//                 <HomeContent />
//               </Router>
//             </FeatureFlagProvider>
//           </SessionProvider>
//         </ApolloWrapper>
//       </CacheProvider>
//     </ConfigProvider>
//   );
// };

// export default Admin;
