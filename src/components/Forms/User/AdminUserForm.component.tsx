import "./AdminUserForm.component.scss";
import { useApolloClient } from "@apollo/client";
import {
  Grid,
  GridColumn,
  Textbox,
  Toggle,
  Field,
  Modal,
  ButtonTheme,
  ErrorHandlerField,
  ErrorHandlerService,
  useVisibility,
  isNullOrWhiteSpace,
  ErrorModel,
  isEmpty,
  Spinner,
  Checkbox,
  Text,
  TextTheme,
} from "@q4/nimbus-ui";
import { Entitlement, Permission } from "@q4/platform-definitions";
import { validate as validateEmail } from "email-validator";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { Role } from "../../../configurations/access.configuration";
import { User, UserApplications } from "../../../definitions/user.definition";
// import { useClaims } from "../../../hooks/useClaims/useClaims.hook";
import { useToastNotificationService } from "../../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { UsersByOrgDocument, useOrganizationQuery } from "../../../schemas/generated/graphql";
import { mapErrorsToKey } from "../../../utils/error/error.utils";
import { NotFoundError } from "../../Errors/NotFoundError/NotFoundError.component";
import {
  AdminUserFormClassName,
  AdminUserFormIdModel,
  AdminUserFormErrorTextboxTheme,
  AdminUserFormMode,
  AdminUserFormWording,
  AdminUserFormLabel,
} from "./AdminUserForm.definition";
import type { AdminUserFormError, AdminUserFormProps } from "./AdminUserForm.definition";
import { getAdminFormUser } from "./AdminUserForm.utils";
import { RoleSelector } from "./components/RoleSelector/RoleSelector.component";

const roleEditPermissionRules = [
  { role: Role.Q4Admin, permission: Permission.ManageUsersAdmin },
  { role: Role.Q4ManageClientRole, permission: Permission.ManageUsersClientTeam },
];

const AdminUserFormBase = (props: AdminUserFormProps): JSX.Element => {
  const {
    id,
    user,
    organizationId,
    saving,
    loading,
    title,
    primaryActionLabel,
    mode,
    showAddAnotherUser,
    onChange,
    onClose,
    onSave,
  } = props;

  const [organizationQuery] = useOrganizationQuery({
    variables: { id: organizationId },
    pause: isNullOrWhiteSpace(organizationId),
  });

  const organization = organizationQuery.data?.organization;

  const claims = useClaims();
  const client = useApolloClient();

  const notifications = useToastNotificationService();

  const isEditMode = useMemo(() => mode === AdminUserFormMode.Edit, [mode]);

  const isNotPermissionedToEdit = useMemo(() => {
    const isEditingAdminOrgUser = isEditMode && organization?.isAdmin;
    if (!isEditingAdminOrgUser) return false;

    return roleEditPermissionRules.some(
      (rolePermissionRule) =>
        user?.roles?.some((role) => role === rolePermissionRule.role) &&
        !claims.permissions?.includes(rolePermissionRule.permission),
    );
  }, [isEditMode, organization?.isAdmin, user?.roles, claims.permissions]);

  const isFieldDisabled = useMemo(
    () => saving || organizationQuery.fetching || isNotPermissionedToEdit,
    [saving, organizationQuery.fetching, isNotPermissionedToEdit],
  );

  const idModel = useMemo(() => new AdminUserFormIdModel(id), [id]);

  const [hidden, handleCloseRequest] = useVisibility();

  const hasDesktopEntitlement = useMemo(
    () => organization?.entitlements?.includes(Entitlement.Desktop),
    [organization?.entitlements],
  );

  const errorService = useRef(
    new ErrorHandlerService<number, User>([
      new ErrorHandlerField("firstName", "First Name is required."),
      new ErrorHandlerField("lastName", "Last Name is required."),
      new ErrorHandlerField("email", "Email is required."),
      new ErrorHandlerField("roles", "At least one role is required"),
    ]),
  );

  const [errors, setErrors] = useState<AdminUserFormError>();

  function handleUserChange<T>(key: keyof User): (value: T) => void {
    return (value: T): void => {
      onChange((state) => ({
        ...state,
        [key]: value,
      }));
    };
  }

  const handleSendDesktopEmailChange = useCallback(
    (value: boolean) => {
      const emailApp = value ? UserApplications.Desktop : UserApplications.Platform;
      onChange((state) => ({
        ...state,
        emailApp,
      }));
    },
    [onChange],
  );

  function checkForErrors(): boolean {
    const errorId = 1;
    errorService.current.checkForErrors(errorId, user);
    const currentErrors = errorService.current.getAll().reduce<AdminUserFormError>(mapErrorsToKey, {});

    const validEmail = validateEmail(user.email);
    currentErrors.email = currentErrors.email ?? new ErrorModel("A valid email is required.", !validEmail);
    setErrors(currentErrors);

    return errorService.current.hasErrors() || !validEmail;
  }

  function handleSave(): Promise<boolean> {
    if (checkForErrors()) {
      return Promise.resolve(false);
    }

    notifications.current.dismiss();
    return onSave(getAdminFormUser(user, organizationId)).then(({ success, message }) => {
      if (!success) {
        notifications.current.error(message);
      } else {
        notifications.current.success(message);
        client.refetchQueries({
          include: [UsersByOrgDocument],
        });
      }
      return success;
    });
  }

  function handleAdd(): void {
    handleSave().then((success) => {
      if (!success) return;
      handleCloseRequest();
    });
  }

  function handleAddAnother(): void {
    handleSave().then((success) => {
      if (!success) return;
      const { roles: existingRoles } = user;
      onChange?.(new User({ roles: existingRoles }));
    });
  }

  function renderContent() {
    if (loading) {
      return <Spinner id={idModel.loadingSpinner.id} masked={false} />;
    }
    if (isEmpty(user)) {
      return <NotFoundError id={idModel.notFound.id} />;
    }

    const isCreateMode = mode === AdminUserFormMode.Create;
    return (
      <>
        <section className={AdminUserFormClassName.Content}>
          <Grid>
            <GridColumn width="1-of-4" mediumWidth="1-of-3" smallWidth="1-of-2">
              <Grid>
                <GridColumn width="1-of-1">
                  <Field
                    required={!isEditMode}
                    id={idModel.emailField.id}
                    label={AdminUserFormLabel.EmailAddress}
                    error={errors?.email}
                  >
                    <Textbox
                      id={idModel.email.id}
                      theme={errors?.email?.visible ? AdminUserFormErrorTextboxTheme : null}
                      value={user?.email}
                      disabled={!isCreateMode || isFieldDisabled}
                      readOnly={!isCreateMode}
                      onChange={!isCreateMode ? null : handleUserChange("email")}
                    />
                  </Field>
                </GridColumn>
              </Grid>
              <Grid>
                <GridColumn width="1-of-1">
                  <Field
                    required
                    id={idModel.firstNameField.id}
                    label={AdminUserFormLabel.FirstName}
                    error={errors?.firstName}
                  >
                    <Textbox
                      id={idModel.firstName.id}
                      theme={errors?.firstName?.visible ? AdminUserFormErrorTextboxTheme : null}
                      value={user?.firstName}
                      disabled={isFieldDisabled}
                      onChange={handleUserChange("firstName")}
                    />
                  </Field>
                </GridColumn>
              </Grid>
              <Grid>
                <GridColumn width="1-of-1">
                  <Field required id={idModel.lastNameField.id} label={AdminUserFormLabel.LastName} error={errors?.lastName}>
                    <Textbox
                      id={idModel.lastName.id}
                      theme={errors?.lastName?.visible ? AdminUserFormErrorTextboxTheme : null}
                      value={user?.lastName}
                      disabled={isFieldDisabled}
                      onChange={handleUserChange("lastName")}
                    />
                  </Field>
                </GridColumn>
              </Grid>
              <Grid>
                <GridColumn width="1-of-1">
                  <Field label={AdminUserFormLabel.UserRole} error={errors?.roles}>
                    <RoleSelector
                      id={idModel.role.id}
                      organization={organization}
                      user={user}
                      disabled={isFieldDisabled}
                      handleUserChange={handleUserChange}
                    />
                  </Field>
                </GridColumn>
              </Grid>
            </GridColumn>
            <GridColumn width="1-of-4" mediumWidth="1-of-3" smallWidth="1-of-2">
              <Grid>
                <GridColumn width="1-of-1">
                  <Field label={AdminUserFormLabel.OrganizationName}>
                    <Textbox disabled id={idModel.organizationName.id} value={organization?.name ?? organizationId} />
                  </Field>
                </GridColumn>
              </Grid>
              <Grid>
                <GridColumn width="1-of-1">
                  <Field label={AdminUserFormLabel.Friendly}>
                    <Textbox
                      id={idModel.friendlyName.id}
                      value={user?.friendlyName}
                      disabled={isFieldDisabled}
                      onChange={handleUserChange("friendlyName")}
                    />
                  </Field>
                </GridColumn>
              </Grid>
              <Grid>
                <GridColumn width="1-of-1">
                  <Field label={AdminUserFormLabel.Title}>
                    <Textbox
                      id={idModel.title.id}
                      value={user?.title}
                      disabled={isFieldDisabled}
                      onChange={handleUserChange("title")}
                    />
                  </Field>
                </GridColumn>
              </Grid>
              {hasDesktopEntitlement && !isEditMode && (
                <Grid>
                  <GridColumn width="1-of-1">
                    <Field className={AdminUserFormClassName.WelcomeEmailContainer}>
                      <Checkbox
                        id={idModel.welcomeEmail.id}
                        label={<strong>{AdminUserFormWording.WelcomeEmailLabel}</strong>}
                        onChange={handleSendDesktopEmailChange}
                        checked={user?.emailApp === UserApplications.Desktop}
                      />
                      <Text theme={TextTheme.Secondary} className={AdminUserFormClassName.WelcomeEmailHint}>
                        {AdminUserFormWording.WelcomeEmailHint}
                      </Text>
                    </Field>
                  </GridColumn>
                </Grid>
              )}
            </GridColumn>
          </Grid>
        </section>
        <section className={AdminUserFormClassName.Footer}>
          <Grid>
            <GridColumn width="1-of-1">
              <Toggle
                id={idModel.active.id}
                labelLeft="DEACTIVATED"
                labelRight="ACTIVE"
                on={!!user?.active}
                disabled={isFieldDisabled}
                onChange={handleUserChange("active")}
              />
            </GridColumn>
          </Grid>
        </section>
      </>
    );
  }

  return (
    <div id={idModel.id}>
      <Modal
        fullscreen
        visible={!hidden}
        badgeIcon="q4i-new-user-2pt"
        id={idModel.modal.id}
        className={AdminUserFormClassName.Base}
        title={title}
        footerActions={[
          {
            id: idModel.saveUser.id,
            key: "admin-user-form_add-user",
            label: primaryActionLabel,
            theme: showAddAnotherUser ? ButtonTheme.DarkSlate : ButtonTheme.Citrus,
            disabled: organizationQuery.fetching || isNotPermissionedToEdit,
            loading: saving,
            onClick: handleAdd,
          },
          {
            id: idModel.addAnotherUser.id,
            key: "admin-user-form_add-another-user",
            label: "CREATE ANOTHER USER",
            theme: ButtonTheme.Citrus,
            hidden: !showAddAnotherUser,
            disabled: organizationQuery.fetching,
            loading: saving,
            onClick: handleAddAnother,
          },
        ]}
        ghostableProps={{ onExited: onClose }}
        onCloseRequest={handleCloseRequest}
      >
        {renderContent()}
      </Modal>
    </div>
  );
};

export const AdminUserForm = memo(AdminUserFormBase);
