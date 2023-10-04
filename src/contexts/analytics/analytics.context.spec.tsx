import { act, render, renderHook } from "@testing-library/react";
import React, { useContext } from "react";
import { AnalyticsContext, AnalyticsProvider } from "./analytics.context";
import { TrackEvents } from "./analytics.definition";
import { usePendo } from "./vendorHooks/usePendo";
import { usePostHog } from "./vendorHooks/usePostHog/usePostHog.hook";

jest.mock("./vendorHooks/usePendo");
jest.mock("./vendorHooks/usePostHog/usePostHog.hook");

describe("AnalyticsProvider", () => {
  it("should render without crashing", () => {
    render(<AnalyticsProvider>{null}</AnalyticsProvider>);
  });

  describe("trackEvent", () => {
    it("should call onTrack from both usePendo and usePostHog", () => {
      const mockPendoOnTrack = jest.fn();
      const mockPostHogOnTrack = jest.fn();

      (usePendo as jest.Mock).mockReturnValue({ onTrack: mockPendoOnTrack });
      (usePostHog as jest.Mock).mockReturnValue({ onTrack: mockPostHogOnTrack });

      const { result } = renderHook(() => useContext(AnalyticsContext), {
        wrapper: AnalyticsProvider,
      });

      act(() => {
        result.current.trackEvent(TrackEvents.AppSwitcherRouteClick, {});
      });

      expect(mockPendoOnTrack).toHaveBeenCalledWith(TrackEvents.AppSwitcherRouteClick, {});
      expect(mockPostHogOnTrack).toHaveBeenCalledWith(TrackEvents.AppSwitcherRouteClick, {});
    });

    it("should exit gracefully if vendors throw error on track", () => {
      (usePendo as jest.Mock).mockReturnValue({
        onTrack: () => {
          throw new Error("pendo error");
        },
      });

      const { result } = renderHook(() => useContext(AnalyticsContext), {
        wrapper: AnalyticsProvider,
      });

      let error;
      act(() => {
        try {
          result.current.trackEvent(TrackEvents.AppSwitcherRouteClick, {});
        } catch (e) {
          error = e;
        }
      });

      expect(error).not.toBeDefined();
    });
  });
});
