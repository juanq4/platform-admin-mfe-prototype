import { throttle as throttleFn } from "lodash";

const ThrottleDefault = {
  Wait: 600,
};

export const throttle = throttleFn((command: () => void) => {
  command();
}, ThrottleDefault.Wait);
