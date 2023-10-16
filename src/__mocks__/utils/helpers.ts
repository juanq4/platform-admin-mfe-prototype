import { isEmpty } from "@q4/nimbus-ui";

export function mockWindowMethods(): Window {
  return Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

export function mockClipboardWrite(): void {
  const orginalClipboard = { ...navigator.clipboard };

  beforeAll(() => {
    if (!isEmpty(navigator.clipboard)) return;

    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () => Promise.resolve(),
      },
    });
  });

  afterAll(() => {
    Object.assign(navigator.clipboard, {
      ...orginalClipboard,
    });
  });
}
