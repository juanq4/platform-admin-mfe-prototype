import styled from "@emotion/styled";
import { Grid, GridColumn } from "@q4/nimbus-ui";
import type { GridColumnProps, GridProps } from "@q4/nimbus-ui";

export const CustomGrid = styled((props: GridProps) => <Grid {...props} />)`
  margin-left: 0;
`;

export const CustomGridColumn = styled((props: GridColumnProps) => <GridColumn {...props} />)`
  padding-left: 0;
`;
