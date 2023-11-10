import { useUser } from "../../contexts/user/user.hook";
import type { User } from "../../definitions/user.definition";
import type { AccountHookModel } from "./useAccount.definition";

// TODO: Delete useAccount hook. Use generated query hooks instead.
export const useAccount = (): AccountHookModel => {
  const { organization, user } = useUser();

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
