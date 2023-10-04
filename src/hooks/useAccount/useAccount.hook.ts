import { useContext } from "react";
import { UserContext } from "../../contexts/user/user.context";
import type { User } from "../../definitions";
import type { AccountHookModel } from "./useAccount.definition";

// TODO: Delete useAccount hook. Use generated query hooks instead.
export const useAccount = (): AccountHookModel => {
  const { organization, user } = useContext(UserContext);

  return [
    {
      entitlements: organization?.entitlements,
      active: !!organization?.active,
      name: organization?.name,
      type: organization?.type,
    },
    { ...user, active: !!user?.active } as User,
  ];
};
