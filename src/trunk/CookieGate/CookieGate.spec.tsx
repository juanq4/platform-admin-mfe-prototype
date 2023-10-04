import { render, screen } from "@testing-library/react";
import React from "react";
import { CookieGate } from "./CookieGate.component";
import { cookieErrorMessage } from "./CookieGate.definition";

describe("CookieGate", () => {
  afterEach(() => {
    Object.defineProperty(global.navigator, "cookieEnabled", {
      writable: true,
      value: true,
    });
  });

  const customRender = () => {
    render(
      <CookieGate>
        <div>Capital Connect</div>
      </CookieGate>,
    );
  };

  test("7924481: [Given] Cookies are enabled [Then] expect Capital Connect to load", () => {
    customRender();

    const CCLoaded = screen.getByText("Capital Connect");

    expect(CCLoaded).toBeVisible();
  });

  test("7924482: [Given] Cookies are 'NOT' enabled [Then] expect Capital Connect to show cookie error message", () => {
    Object.defineProperty(global.navigator, "cookieEnabled", {
      writable: true,
      value: false,
    });

    customRender();

    const CookieDisabledMessage = screen.getByText(cookieErrorMessage);
    const CCLoaded = screen.queryByText("Capital Connect");

    expect(CookieDisabledMessage).toBeVisible();
    expect(CCLoaded).not.toBeInTheDocument();
  });
});
