import { useEffect } from "react";
import pckg from "../../../package.json";

export const useVersionTag = (): void => {
  useEffect(() => {
    const tagName = `${pckg.name}-version`;
    //const tagName = "@com.q4inc.connect.platform.mfe.home/platform-home-mfe-version";
    const version = pckg.version;
    const refTag = document.querySelector("meta[name=viewport]");
    const versionTag = document.querySelector(`meta[name="${tagName}"]`);

    if (versionTag) {
      versionTag.setAttribute("content", version);
    } else {
      const versionEl = document.createElement("meta");
      versionEl.setAttribute("name", tagName);
      versionEl.setAttribute("content", version);
      refTag ? refTag.after(versionEl) : document.head.appendChild(versionEl);
    }
  });
};
