import { NimbusConfig, NimbusProviderImplementationMock } from "../contexts";

export const createAppWrapper = (): void => {
  const body = global.document.querySelector("body");
  const rootElement = global.document.createElement("div");

  rootElement.setAttribute("id", "root");
  body.appendChild(rootElement);

  const nimbusConfigSpy = jest.spyOn(NimbusConfig, "ConfigProvider");
  nimbusConfigSpy.mockImplementation(NimbusProviderImplementationMock);
};

export const destroyAppWrapper = (): void => {
  const body = global.document.querySelector("body");
  const rootElement = global.document.getElementById("root");

  if (rootElement) {
    body.removeChild(rootElement);
  }
};

export const getAppWrapper = (): HTMLElement => {
  return global.document.getElementById("root");
};
