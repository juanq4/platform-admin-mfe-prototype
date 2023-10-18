import { ToastContainer } from "@q4/nimbus-ui";
import React from "react";
import { NimbusConfig } from "../../__mocks__/contexts/NimbusConfig.mock";
import { mockClipboardWrite } from "../../__mocks__/utils/helpers";
import { getAppWrapper } from "../../__mocks__/utils/wrappers";
import { fireEvent, render, screen, waitFor } from "../../utils/testUtils";
import { CopyButton } from "./CopyButton.component";
import type { CopyButtonProps } from "./CopyButton.definition";
import { CopyButtonDefault, CopyButtonIdModel } from "./CopyButton.definition";
import { getCopyButtonFailureMessage, getCopyButtonSuccessMessage, isCopyButtonDisabled } from "./CopyButton.utils";

const MockLabel = "mock label";
const MockValue = "this is a mock string";

describe("CopyButton Component", () => {
  mockClipboardWrite();

  function renderWithConfigs(props: CopyButtonProps) {
    return (
      <NimbusConfig.ConfigProvider>
        <CopyButton {...props} />
      </NimbusConfig.ConfigProvider>
    );
  }

  test("7378438: [Given] no props are provided [Expect] the component to render", () => {
    const props: CopyButtonProps = {
      value: null,
      label: null,
    };
    render(renderWithConfigs(props), { container: getAppWrapper() });
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  const idModel = new CopyButtonIdModel("MockCopyButtonId");
  const { id } = idModel;
  const mockProps = [
    {
      id,
      value: MockValue,
      label: MockLabel,
      expectedLabel: MockLabel,
    },
    {
      id,
      value: MockValue,
      label: null as string,
      expectedLabel: CopyButtonDefault.Label,
    },
  ];

  test("7378439: [Given] the copy the text value is 'null' [Expect] the button to be disabled", () => {
    const props = {
      id,
      value: null as string,
      label: MockLabel,
    };

    render(renderWithConfigs(props));

    const button = screen.queryByTestId(id);
    expect(button).toBeDisabled();
    expect(button).toMatchSnapshot();
  });

  test("7449116: [Given] copying the text 'this is a mock string' was a success [And] the label is 'mock label' [Expect] a success toast message with 'mock label'  to appear", async () => {
    const { expectedLabel, ...componentProps } = mockProps[0];
    Object.assign(navigator.clipboard, { writeText: () => Promise.resolve() });

    render(
      <>
        {renderWithConfigs(componentProps)}
        <ToastContainer />
      </>,
    );

    const button = screen.queryByTestId(id);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    // FIXME: PLATFORM-1926 This type of assertion is very slow. Instead, the test should
    // be mocking useNotifications and putting an assertion on notifications.current.success.
    // Once that the invocation of the notification is asserted, there would be no need
    // for a snapshot test either.
    let toast: Element;

    await waitFor(() => {
      toast = screen.getByText(getCopyButtonSuccessMessage(expectedLabel))?.parentElement?.parentElement;
      expect(toast).toBeInTheDocument();
    });
  });

  test("7449117: [Given] copying the text 'this is a mock string' was a success [And] the label is 'null' [Expect] a success toast message with 'value' to appear", async () => {
    const { expectedLabel, ...componentProps } = mockProps[1];
    Object.assign(navigator.clipboard, { writeText: () => Promise.resolve() });

    render(
      <>
        {renderWithConfigs(componentProps)}
        <ToastContainer />
      </>,
    );

    const button = screen.queryByTestId(id);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    // FIXME: PLATFORM-1926 This type of assertion is very slow. Instead, the test should
    // be mocking useNotifications and putting an assertion on notifications.current.success.
    // Once that the invocation of the notification is asserted, there would be no need
    // for a snapshot test either.
    let toast: Element;

    await waitFor(() => {
      toast = screen.getByText(getCopyButtonSuccessMessage(expectedLabel))?.parentElement?.parentElement;
      expect(toast).toBeInTheDocument();
    });
  });

  test("7449118: [Given] copying the text 'this is a mock string' was a failure [And] the label is 'mock label' [Expect] a failure toast message with 'mock label'  to appear", async () => {
    const { expectedLabel, ...componentProps } = mockProps[0];
    Object.assign(navigator.clipboard, { writeText: () => Promise.reject() });

    render(
      <>
        {renderWithConfigs(componentProps)}
        <ToastContainer />
      </>,
    );

    const button = screen.queryByTestId(id);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    // FIXME: PLATFORM-1926 This type of assertion is very slow. Instead, the test should
    // be mocking useNotifications and putting an assertion on notifications.current.success.
    // Once that the invocation of the notification is asserted, there would be no need
    // for a snapshot test either.
    let toast: Element;

    await waitFor(() => {
      toast = screen.getByText(getCopyButtonFailureMessage(expectedLabel))?.parentElement?.parentElement;
      expect(toast).toBeInTheDocument();
    });
  });

  test("7449119: [Given] copying the text 'this is a mock string' was a failure [And] the label is 'mock label' [Expect] a failure toast message with 'mock label'  to appear", async () => {
    const { expectedLabel, ...componentProps } = mockProps[1];
    Object.assign(navigator.clipboard, { writeText: () => Promise.reject() });

    render(
      <>
        {renderWithConfigs(componentProps)}
        <ToastContainer />
      </>,
    );

    const button = screen.queryByTestId(id);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    // FIXME: PLATFORM-1926 This type of assertion is very slow. Instead, the test should
    // be mocking useNotifications and putting an assertion on notifications.current.success.
    // Once that the invocation of the notification is asserted, there would be no need
    // for a snapshot test either.
    let toast: Element;

    await waitFor(() => {
      toast = screen.getByText(getCopyButtonFailureMessage(expectedLabel))?.parentElement?.parentElement;
      expect(toast).toBeInTheDocument();
    });
  });
});

test(`7449121: [Given] the label is '${MockLabel}' [Expect] the returned label to match'`, () => {
  expect(getCopyButtonSuccessMessage(MockLabel)).toBe("The mock label has been copied to your clipboard.");
});

test("7449122: [Given] the label is '' [Expect] the returned label to match'", () => {
  expect(getCopyButtonSuccessMessage("")).toBe("The value has been copied to your clipboard.");
});

test(`7449691: [Given] the label is '${MockLabel}' [Expect] the returned label to match'`, () => {
  expect(getCopyButtonFailureMessage(MockLabel)).toBe("The mock label failed to copy to your clipboard.");
});

test("7449692: [Given] the label is '' [Expect] the returned label to match'", () => {
  expect(getCopyButtonFailureMessage("")).toBe("The value failed to copy to your clipboard.");
});

test("7449693: [Given] the label is 'this is a mock string' [Expect] the returned label to match'", () => {
  const returned = isCopyButtonDisabled(MockValue);
  expect(returned).toMatchSnapshot();
});

test("7449694: [Given] the label is 'null' [Expect] the returned label to match'", () => {
  const returned = isCopyButtonDisabled(null);
  expect(returned).toMatchSnapshot();
});

describe("isCopyButtonDisabled", () => {
  test("7449693: [Given] the label is 'this is a mock string' [Expect] the returned label to match'", () => {
    const returned = isCopyButtonDisabled(MockValue);
    expect(returned).toMatchSnapshot();
  });

  test("7449694: [Given] the label is 'null' [Expect] the returned label to match'", () => {
    const returned = isCopyButtonDisabled(null);
    expect(returned).toMatchSnapshot();
  });
});
