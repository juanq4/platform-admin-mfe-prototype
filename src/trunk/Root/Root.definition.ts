import { IdModelBase } from "@q4/nimbus-ui";

export interface NavigationProps {
  showMobileNavigation: boolean;
  onToggleMobileNavigation: () => void;
}

class IdModel extends IdModelBase {
  public loading!: string;
  landing: string;

  constructor(id: string) {
    super(id);

    this.loading = `${this.id}LoadingScreen`;
    this.landing = `${this.id}LandingContent`;
  }
}

const ViewId = "Root";
export const RootViewIdModel = new IdModel(ViewId);
