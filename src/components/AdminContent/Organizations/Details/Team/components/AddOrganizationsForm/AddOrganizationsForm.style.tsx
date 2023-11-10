import styled from "@emotion/styled";
import type { AsyncSelectProps } from "@q4/nimbus-ui";
import { AsyncSelect } from "@q4/nimbus-ui";
import type { OrganizationTeamOption } from "../../../../../../../definitions/organization.definition";

export const CustomAsyncSelect = styled((props: AsyncSelectProps<OrganizationTeamOption>) => <AsyncSelect {...props} />)`
  .nui-toggle-input-base--steel.nui-toggle-input-base--checked .nui-toggle-input-base_control {
    background-color: #0a3d6d;
  }

  .nui-checkbox_box.nui-toggle-input-base_control {
    background: #ffffff;
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
  color: #61707c;
  margin: auto 0 auto 20px;
  font-size: 12px;
`;
