import { BroadcastChannel as BroadcastChannelPolyfill } from "broadcast-channel";
import type { PropsWithChildren } from "react";
import { createContext, useMemo } from "react";
import { shellChannelName } from "./broadcast.context.definition";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const BroadcastContext = createContext<BroadcastChannel>(undefined!);

export const BroadcastProvider = (props: PropsWithChildren): JSX.Element => {
  // Use polyfill to support Safari 15.3 and older
  // Be careful when removing the polyfill, as the implementation is slightly different from the native BroadcastChannel
  const channel = useMemo(() => new BroadcastChannelPolyfill(shellChannelName) as unknown as BroadcastChannel, []);

  return <BroadcastContext.Provider value={channel}>{props.children}</BroadcastContext.Provider>;
};
