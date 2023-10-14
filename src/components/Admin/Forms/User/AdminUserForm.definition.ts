import {
  ButtonIdModel,
  CheckboxIdModel,
  ComboBoxIdModel,
  FieldIdModel,
  IdModelBase,
  isNullOrWhiteSpace,
  ModalIdModel,
  SpinnerIdModel,
  TextboxIdModel,
  TextboxTheme,
  ToggleIdModel,
} from "@q4/nimbus-ui";
import type { BaseComponentProps, ErrorModel, ModalProps } from "@q4/nimbus-ui";
import type { Dispatch, Key, SetStateAction } from "react";
import type { Organization } from "../../../../definitions/organization.definition";
import type { User } from "../../../../definitions/user.definition";
import type { ApiResponse } from "../../../../hooks/useQuery/useQuery.definition";
import { NotFoundErrorIdModel } from "../../../Errors/NotFoundError/NotFoundError.definition";

export const AdminUserFormErrorTextboxTheme = TextboxTheme.Spice;

export interface AdminUserFormError {
  firstName?: ErrorModel;
  lastName?: ErrorModel;
  email?: ErrorModel;
  roles?: ErrorModel;
}

export enum AdminUserFormMode {
  Create,
  Edit,
}

export interface AdminUserFormProps extends BaseComponentProps {
  user: User;
  organizationId: Organization["id"];
  saving?: boolean;
  loading?: boolean;
  title: string;
  mode: AdminUserFormMode;
  primaryActionLabel: string;
  showAddAnotherUser: boolean;
  onChange: Dispatch<SetStateAction<User>>;
  onClose: ModalProps["onCloseRequest"];
  onSave: (user: User) => Promise<Pick<ApiResponse<never>, "success" | "message">>;
}

export enum AdminUserFormClassName {
  Base = "admin-user-form",
  Content = "admin-user-form_content",
  Footer = "admin-user-form_footer",
  WelcomeEmailContainer = "welcome-email_container",
  WelcomeEmailHint = "welcome-email_hint",
}

export enum AdminUserFormLabel {
  EmailAddress = "Email address",
  OrganizationName = "Organization Name",
  FirstName = "First Name",
  LastName = "Last Name",
  UserRole = "User role",
  Friendly = "Friendly",
  Title = "Title",
}

export class AdminUserFormIdModel extends IdModelBase {
  modal: ModalIdModel;
  email: TextboxIdModel;
  emailField: FieldIdModel;
  firstName: TextboxIdModel;
  firstNameField: FieldIdModel;
  lastName: TextboxIdModel;
  lastNameField: FieldIdModel;
  friendlyName: TextboxIdModel;
  organizationName: TextboxIdModel;
  title: TextboxIdModel;
  role: ComboBoxIdModel;
  welcomeEmail: CheckboxIdModel;
  active: ToggleIdModel;
  saveUser: ButtonIdModel;
  addAnotherUser: ButtonIdModel;
  notFound: NotFoundErrorIdModel;
  loadingSpinner: SpinnerIdModel;

  constructor(id: string, index?: Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.modal = new ModalIdModel(null);

      this.email = new TextboxIdModel(null);
      this.emailField = new FieldIdModel(null);

      this.firstName = new TextboxIdModel(null);
      this.firstNameField = new FieldIdModel(null);

      this.lastName = new TextboxIdModel(null);
      this.lastNameField = new FieldIdModel(null);

      this.friendlyName = new TextboxIdModel(null);
      this.organizationName = new TextboxIdModel(null);
      this.title = new TextboxIdModel(null);
      this.role = new ComboBoxIdModel(null);
      this.welcomeEmail = new CheckboxIdModel(null);

      this.active = new ToggleIdModel(null);
      this.saveUser = new ButtonIdModel(null);
      this.addAnotherUser = new ButtonIdModel(null);
      this.notFound = new NotFoundErrorIdModel(null);
      this.loadingSpinner = new SpinnerIdModel(null);
      return;
    }

    this.modal = new ModalIdModel(`${this.id}Modal`);

    this.email = new TextboxIdModel(`${this.id}EmailTextbox`);
    this.emailField = new FieldIdModel(`${this.id}EmailField`);

    this.firstName = new TextboxIdModel(`${this.id}FirstNameTextbox`);
    this.firstNameField = new FieldIdModel(`${this.id}FirstNameField`);

    this.lastName = new TextboxIdModel(`${this.id}LastNameTextbox`);
    this.lastNameField = new FieldIdModel(`${this.id}LastNameField`);

    this.friendlyName = new TextboxIdModel(`${this.id}FriendlyTextbox`);
    this.organizationName = new TextboxIdModel(`${this.id}OrganizationNameTextbox`);
    this.title = new TextboxIdModel(`${this.id}TitleTextbox`);
    this.role = new ComboBoxIdModel(`${this.id}RoleComboBox`);
    this.welcomeEmail = new CheckboxIdModel(`${this.id}WelcomeEmailCheckbox`);

    this.active = new ToggleIdModel(`${this.id}ActiveToggle`);
    this.saveUser = new ButtonIdModel(`${this.id}AddUserButton`);
    this.addAnotherUser = new ButtonIdModel(`${this.id}AddAnotherUserButton`);
    this.notFound = new NotFoundErrorIdModel(`${this.id}NotFoundLabel`);
    this.loadingSpinner = new SpinnerIdModel(`${this.id}LoadingSpinner`);
  }
}

export enum AdminUserFormWording {
  WelcomeEmailLabel = "Send a Desktop welcome email",
  WelcomeEmailHint = "If this box is unchecked the user will receive a Q4 Platform welcome email",
}
