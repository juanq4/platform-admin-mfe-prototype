import type { History } from "history";
import { updateVersionOnRefresh } from "./VersionProvider.definition";

export const versionUpdatingFlag = Object.create({
  set: () => localStorage.setItem(updateVersionOnRefresh, "true"),
  get: () => localStorage.getItem(updateVersionOnRefresh) === "true",
  remove: () => localStorage.removeItem(updateVersionOnRefresh),
});

export const reloadPageOnUrlChange = (history: History): void => {
  // TODO - There is currently nothing served at '/' so we don't need to reload if this is the entry path
  if (window.location.pathname !== "/") {
    versionUpdatingFlag.set();

    history.listen(() => {
      window.location.reload();
    });
  }
};
