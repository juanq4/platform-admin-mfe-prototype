import styled from "@emotion/styled";
import type { AsyncSelectProps } from "@q4/nimbus-ui";
import { AsyncSelect } from "@q4/nimbus-ui";
import type { OrganizationTeamOption } from "../../../../../../../definitions";

export const CustomAsyncSelect = styled((props: AsyncSelectProps<OrganizationTeamOption>) => <AsyncSelect {...props} />)`
  .nui-toggle-input-base--steel.nui-toggle-input-base--checked .nui-toggle-input-base_control {
    background-color: ${({ theme }) => theme.colors.primary400};
  }

  .nui-checkbox_box.nui-toggle-input-base_control {
    background: ${({ theme }) => theme.colors.white};
  }

  .nui-select_option-checkbox {
    margin: auto;
  }
`;

export const CustomOption = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-right: 8px;
  line-height: 16px;
  align-items: center;
`;

export const CustomOptionLabel = styled.div`
  white-space: pre-wrap;
  margin: auto 0;
`;

export const CustomOptionStatus = styled.div`
  color: ${({ theme }) => theme.colors.neutral500}
  margin: auto 0 auto 20px;
  font-size: 12px;
`;
