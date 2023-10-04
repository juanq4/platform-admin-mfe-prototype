import { useEffect } from "react";

export const useMutationObserver = (callback: () => void): void => {
  useEffect(() => {
    const targetNode = document.body;

    const observer = new MutationObserver(callback);

    const config = { attributes: true, childList: true, subtree: true };

    observer.observe(targetNode, config);

    return () => observer.disconnect();
  }, [callback]);
};
