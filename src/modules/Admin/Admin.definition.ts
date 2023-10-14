import { BannerIdModel, IdModelBase, LayoutIdModel } from "@q4/nimbus-ui";
import type { Tab } from "@q4/nimbus-ui";
import { AdminRoutePath } from "../../configurations/navigation.configuration";

export enum AdminViewClassName {
  Base = "admin",
  Banner = "admin_banner",
  Content = "admin_content",
  BannerButton = "admin_banner-button",
}

export enum AdminViewDefault {
  Title = "Admin",
  GoToClientAccountLabel = "Go to client accounts",
  Icon = "q4i-q4-team-2pt",
}

class AdminIdModel extends IdModelBase {
  banner: BannerIdModel;
  content: LayoutIdModel;
  organizationsTab: string;
  usersTab: string;

  constructor(id: string) {
    super(id);
    this.banner = new BannerIdModel(`${this.id}Banner`);
    this.content = new LayoutIdModel(`${this.id}Content`);
    this.organizationsTab = `${this.id}OrganizationsTab`;
    this.usersTab = `${this.id}UsersTab`;
  }
}

const ViewId = "Admin";
export const AdminViewIdModel = new AdminIdModel(ViewId);

export const AdminViewTabs: Tab[] = [
  {
    id: AdminViewIdModel.organizationsTab,
    label: "Organizations",
    value: AdminRoutePath.Organizations,
  },
  {
    id: AdminViewIdModel.usersTab,
    label: "Users",
    value: AdminRoutePath.Users,
  },
];
