import { ComboBox } from "@q4/nimbus-ui";
import { useMemo } from "react";
import { useSession } from "../../../../../contexts/session/useSession.hook";
import { useComboBox } from "../../../../../hooks/useComboBox/useComboBox.hook";
import { getRoles } from "../../../../../utils/organization/getRoles";
import type { RoleSelectorProps } from "./RoleSelector.definition";

export const RoleSelector = (props: RoleSelectorProps): JSX.Element => {
  const { id, organization, user, handleUserChange, disabled } = props;

  const session = useSession();

  const roles = useMemo(
    () => (organization ? getRoles(organization, session.permissions) : []),
    [organization, session.permissions],
  );

  const {
    input: roleInput,
    handleInputChange: setRoleInput,
    chipsHook: useRoleChips,
    filteredOptions: roleOptions,
  } = useComboBox({
    options: roles,
    chipsHookProps: {
      entities: user?.roles,
    },
  });

  const [roleChips, handleRoleAdd, handleRoleRemove] = useRoleChips;

  function handleRoleSelect(value: string): void {
    const updatedRoles = handleRoleAdd(value);
    handleUserChange("roles")(updatedRoles);
  }

  function handleRoleRemoval(value: string): void {
    const updatedRoles = handleRoleRemove(value);
    handleUserChange("roles")(updatedRoles);
  }

  return (
    <ComboBox
      id={id}
      className={disabled ? "disabled" : ""}
      selectProps={{
        value: roleInput,
        options: roleOptions,
        disabled,
        onChange: handleRoleSelect,
        onInputChange: setRoleInput,
      }}
      chipsProps={{
        inline: true,
        items: roleChips,
        clearIcon: disabled ? "" : undefined,
        onClick: disabled ? undefined : handleRoleRemoval,
        onRemove: disabled ? undefined : handleRoleRemoval,
      }}
    />
  );
};
