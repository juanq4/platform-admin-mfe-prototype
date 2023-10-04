import { act, renderHook } from "@testing-library/react";
import { posthog } from "posthog-js";
import { useUser } from "../../../user";
import { TrackEvents } from "../../analytics.definition";
import { usePostHog } from "./usePostHog.hook";

jest.mock("../../../user", () => ({
  useUser: jest.fn(() => ({})),
}));

jest.mock("posthog-js");

const testEmail = "test@example.com";

describe("usePostHog", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize PostHog only for non q4 users", () => {
    // external users
    (useUser as jest.Mock).mockReturnValue({
      user: { email: "non_internal@external.com" },
    });
    renderHook(() => usePostHog());
    expect(posthog.init).toHaveBeenCalledWith(expect.any(String), expect.any(Object));

    // internal users
    (useUser as jest.Mock).mockReturnValue({
      user: { email: "internal@q4inc.com" },
    });
    posthog.init.mockClear();

    renderHook(() => usePostHog());
    expect(posthog.init).not.toHaveBeenCalled();
  });

  it("should identify user after initialization", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { email: testEmail },
      organizationId: "org-123",
      organization: {},
    });

    renderHook(() => usePostHog());

    act(() => {
      const callback = (posthog.init as jest.Mock).mock.calls[0][1].loaded;
      callback();
    });

    expect(posthog.identify).toHaveBeenCalledWith(testEmail, expect.any(Object));
  });

  describe("handleTrack", () => {
    it("should not call capture if missing critical user info", () => {
      (useUser as jest.Mock).mockReturnValue({});
      const { result } = renderHook(() => usePostHog());

      act(() => {
        result.current.onTrack(TrackEvents.AppSwitcherRouteClick, {});
      });

      expect(posthog.capture).not.toHaveBeenCalled();
    });

    it("should call PostHog's capture method for valid data", () => {
      (useUser as jest.Mock).mockReturnValue({
        user: { email: testEmail },
        organizationId: "org-123",
        organization: {},
      });

      const { result } = renderHook(() => usePostHog());

      act(() => {
        result.current.onTrack(TrackEvents.AppSwitcherRouteClick, {});
      });

      expect(posthog.capture).toHaveBeenCalledWith(TrackEvents.AppSwitcherRouteClick, expect.any(Object));
    });
  });
});
