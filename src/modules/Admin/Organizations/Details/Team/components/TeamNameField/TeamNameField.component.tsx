import { Field, Textbox, TextboxTheme } from "@q4/nimbus-ui";
import { memo, useMemo } from "react";
import {
  CustomGrid,
  CustomGridColumn,
} from "../../../../../../../modules/Admin/Organizations/Details/Team/OrganizationsTeam.style";
import type { TeamNameFieldProps } from "./TeamNameField.definition";
import { TeamNameFieldIdModel, TeamNameFieldLanguage } from "./TeamNameField.definition";

const TeamNameFieldBase = (props: TeamNameFieldProps): JSX.Element => {
  const { id, teamName, disabled, errors, onChangeName } = props;
  const idModel = useMemo(() => new TeamNameFieldIdModel(id), [id]);

  return (
    <CustomGrid id={idModel.id}>
      <CustomGridColumn width="1-of-1">
        <Field id={idModel.field.id} label={TeamNameFieldLanguage.Label} error={errors?.name} required>
          <Textbox
            id={idModel.textbox.id}
            value={teamName}
            theme={errors?.name?.visible && TextboxTheme.Spice}
            disabled={disabled}
            onChange={onChangeName}
          />
        </Field>
      </CustomGridColumn>
    </CustomGrid>
  );
};

export const TeamNameField = memo(TeamNameFieldBase);
