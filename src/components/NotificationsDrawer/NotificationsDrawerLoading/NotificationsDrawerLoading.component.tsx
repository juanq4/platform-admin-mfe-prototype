import { Skeleton, SkeletonTheme, SkeletonType } from "@q4/nimbus-ui";
import { memo } from "react";
import { Container, Content, Heading, Body, Tags } from "./NotificationsDrawerLoading.style";

const Component = (): JSX.Element => (
  <>
    {Array(5)
      .fill(
        <Content>
          <Heading>
            <Skeleton
              active
              style={{ height: 24, width: 24 }}
              minWidth={false}
              theme={SkeletonTheme.Light}
              type={SkeletonType.Bar}
            />
            <Skeleton active style={{ width: 188 }} minWidth={false} theme={SkeletonTheme.Light} type={SkeletonType.Bar} />
          </Heading>
          <Body>
            {Array(2).fill(
              <Skeleton
                active
                style={{ height: 16, marginBottom: 4, width: 416 }}
                minWidth={false}
                theme={SkeletonTheme.Light}
                type={SkeletonType.Bar}
              />,
            )}
          </Body>
          <Tags>
            {Array(2).fill(
              <Skeleton
                active
                style={{ height: 16, width: 136 }}
                minWidth={false}
                theme={SkeletonTheme.Light}
                type={SkeletonType.Bar}
              />,
            )}
          </Tags>
        </Content>,
      )
      .map((element, index) => (
        <Container id="notifications-drawer-loading" key={index}>
          {element}
        </Container>
      ))}
  </>
);

export const NotificationsDrawerLoading = memo(Component);
