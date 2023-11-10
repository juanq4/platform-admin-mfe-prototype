/* eslint-disable testing-library/no-node-access */
import pckg from "../../../package.json";
import { renderHook, waitFor } from "../../utils/testUtils";
import { useVersionTag } from "./useVersionTag.hook";

describe("useVersionTag", () => {
  test(": [Given] a MFE Home version number, [Then] expect the version is appended to the head in the source.", async () => {
    renderHook(useVersionTag);

    await waitFor(() => {
      const meta = document.querySelector(`meta[name="${pckg.name}-version"]`);
      expect(meta).toHaveAttribute("content", pckg.version);
    });
  });

  test(": [Given] a MFE Home version tag exists in document, [Then] next component render will not create new version tag.", async () => {
    renderHook(useVersionTag);

    await waitFor(() => {
      const meta = document.querySelector(`meta[name="${pckg.name}-version"]`);
      expect(meta).toBeInTheDocument();
    });

    renderHook(useVersionTag);

    await waitFor(() => {
      const meta = document.querySelector(`meta[name="${pckg.name}-version"]`);
      expect(meta).toHaveAttribute("content", pckg.version);
    });
  });
});
