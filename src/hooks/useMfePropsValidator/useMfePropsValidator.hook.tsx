import type { MfeProps } from "@q4/platform-definitions";

export const useMfePropsValidator = (props: MfeProps): void => {
  const { context, token, onError } = props;

  if (!context?.userId) {
    throw new Error("userId is missing from context");
  }

  if (!context?.roles) {
    throw new Error("roles is missing from context");
  }

  if (!context?.organization?.id) {
    throw new Error("id is missing from organization");
  }

  if (!context?.organization?.name) {
    throw new Error("name is missing from organization");
  }

  if (!context?.organization?.entitlements) {
    throw new Error("entitlements is missing from organization");
  }

  if (!context?.organization?.identifiers) {
    throw new Error("identifiers is missing from organization");
  }

  if (!token) {
    throw new Error("token is missing");
  }

  if (!onError) {
    throw new Error("onError is missing");
  }
};
