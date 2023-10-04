const name = "x-q4-shell-version";

export const setCanaryInitializedCookie = (): void => {
  document.cookie = "q4_canary_initialized=true; path=/; SameSite=None; Secure";
};

export const isCanaryInitialized = (): boolean =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith("q4_canary_initialized="))
    ?.split("=")[1] === "true";

export const getShellVersionCookie = (): string | undefined =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith("x-q4-shell-version="))
    ?.split("=")[1];

export const setShellVersionCookie = (version: string): void => {
  document.cookie = `${name}=${version}; path=/; SameSite=None; Secure; expires=${new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toUTCString()}`;
};

export const deleteShellVersionCookie = (): void => {
  document.cookie = `${name}=latest; path=/; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
