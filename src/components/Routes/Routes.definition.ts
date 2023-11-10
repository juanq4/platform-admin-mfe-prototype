import { IdModelBase, isNullOrWhiteSpace, SpinnerIdModel } from "@q4/nimbus-ui";
import type { NotFoundErrorIdModel } from "../Errors/NotFoundError/NotFoundError.definition";

class ViewIdModel extends IdModelBase {
  loadingSpinner: SpinnerIdModel;
  notFound: NotFoundErrorIdModel;

  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);
    if (isNullOrWhiteSpace(this.id)) {
      this.loadingSpinner = new SpinnerIdModel(null);
      this.notFound = new SpinnerIdModel(null);
      return;
    }

    this.notFound = new SpinnerIdModel(`${this.id}NotFound`);
    this.loadingSpinner = new SpinnerIdModel(`${this.id}LoadingSpinner`);
  }
}

export const AdminRoutesIdModel = new ViewIdModel("AdminRoutes");
