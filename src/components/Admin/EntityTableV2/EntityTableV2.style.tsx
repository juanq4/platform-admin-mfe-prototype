import styled from "@emotion/styled";
import { ToolbarGroup } from "@q4/nimbus-ui";
import type { PropsWithChildren } from "react";

export const ToolbarGroupContainer = styled((props: PropsWithChildren) => <ToolbarGroup {...props} />)`
  display: flex;
  align-items: center;
`;

export const PaginationContainer = styled.div`
  .nui-pagination {
    padding-top: 25px;
    justify-content: center;
  }
`;
